package com.example.DWShopProject.dao;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SearchResultDto {


    private List<SearchDto> results; // 검색된 상품 리스트


    private int totalResults; // 검색 결과 개수
}
