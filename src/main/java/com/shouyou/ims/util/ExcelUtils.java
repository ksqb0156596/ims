package com.shouyou.ims.util;

import org.apache.catalina.connector.Response;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by Administrator on 2016/10/3.
 */
public class ExcelUtils {
    public static <T> List<T> parseExcel(MultipartFile multipartFile,T t){
        List<T> list = new ArrayList<>();
        try {
            Workbook workbook = WorkbookFactory.create(multipartFile.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            Sheet columes = workbook.getSheetAt(1);
            Row colRow = columes.getRow(0);
            Iterator<Row> it = sheet.iterator();
            it.next();
            Class clazz = t.getClass();
            while(it.hasNext()){
                Row row = it.next();
                if(row.getPhysicalNumberOfCells() == 0){
                    break;
                }
                int i = 0;
                Object _t = clazz.newInstance();
                for(int j = 0;j < colRow.getLastCellNum();j++){
                    Cell cell = row.getCell(j);
                    Field field = clazz.getDeclaredField(colRow.getCell(i).getStringCellValue());
                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
                    //获得set方法
                    Method method = pd.getWriteMethod();
                    method.invoke(_t, getCellValue(cell));
                    i++;
                }

                list.add((T) _t);
            }
            return list;
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InstantiationException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IntrospectionException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static <T> void exportExcel(InputStream fileInputStream,List<T> list,HttpServletResponse response){
        Workbook workbook = null;
        try {
            workbook = new HSSFWorkbook(fileInputStream);
            Sheet sheet = workbook.getSheetAt(0);
            Sheet sheet1 = workbook.getSheetAt(1);
            Row colRow = sheet1.getRow(0);

            for(int i = 0;i < list.size();i++){
                T obj = list.get(i);
                Class clazz = obj.getClass();
                Row row = sheet.createRow(i+1);
                for(int j = 0;j < colRow.getPhysicalNumberOfCells();j++){
                    Cell cell = row.createCell(j);
                    Field field = clazz.getDeclaredField(colRow.getCell(j).getStringCellValue());
                    PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
                    Method method = pd.getReadMethod();
                    String cellStr = String.valueOf(method.invoke(obj));
                    try{
                        cell.setCellValue(Double.parseDouble(cellStr));
                    }catch (Exception e){
                        cell.setCellValue(cellStr);
                    }

                }
            }

            OutputStream outputStream = response.getOutputStream();
            workbook.write(outputStream);
            outputStream.flush();
            outputStream.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (IntrospectionException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (InvocationTargetException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

    }

    private static String getCellValue(Cell cell){
        String strCell = "";
        if(cell == null){
            return strCell;
        }
        switch (cell.getCellType()) {
            case Cell.CELL_TYPE_STRING:
                strCell = cell.getStringCellValue();
                break;
            case Cell.CELL_TYPE_NUMERIC:
                strCell = String.valueOf(cell.getNumericCellValue());
                break;
            case Cell.CELL_TYPE_BOOLEAN:
                strCell = String.valueOf(cell.getBooleanCellValue());
                break;
            case Cell.CELL_TYPE_BLANK:
                strCell = "";
                break;
            default:
                strCell = "";
                break;
        }
        if (strCell.equals("") || strCell == null) {
            return "";
        }
        if (cell == null) {
            return "";
        }
        return strCell;
    }
}
