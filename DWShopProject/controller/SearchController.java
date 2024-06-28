package com.example.DWShopProject.controller;

import com.example.DWShopProject.dao.SearchResultDto;
import com.example.DWShopProject.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    /**
     * 특정 단어가 포함된 상품명을 검색합니다.
     * @param keyword 검색할 키워드
     * @return 검색된 상품 리스트와 결과 개수를 포함한 SearchResultDto
     */
    @GetMapping("/name")
    public ResponseEntity<SearchResultDto> searchByName(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchByProductNameContaining(keyword));
    }

    /**
     * 서브 타입 및 메인 타입으로 상품을 검색합니다.
     * @param keyword 검색할 타입의 display name
     * @return 검색된 상품 리스트와 결과 개수를 포함한 SearchResultDto
     */
    @GetMapping("/type")
    public ResponseEntity<SearchResultDto> searchByType(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchByProductType(keyword));
    }

    // 전체보기 검색 엔드포인트 추가
    @GetMapping("/all")
    public ResponseEntity<SearchResultDto> searchAll(@RequestParam String keyword) {
        return ResponseEntity.ok(searchService.searchAll(keyword));
    }
}
