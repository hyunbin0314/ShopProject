package com.example.DWShopProject.dao;

import com.example.DWShopProject.enums.ProductTypeEnum;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SearchDto {
    private Long id;
    private ProductTypeEnum productType;
    private String productName;
    private int price;
    private String explanation;
    private String imageUrl;
}
