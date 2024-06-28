package com.example.DWShopProject.service;

import com.example.DWShopProject.dao.SearchDto;
import com.example.DWShopProject.dao.SearchResultDto;
import com.example.DWShopProject.entity.Product;
import com.example.DWShopProject.entity.ProductTypeMgmt;
import com.example.DWShopProject.enums.ParentTypeEnum;
import com.example.DWShopProject.enums.ProductTypeEnum;
import com.example.DWShopProject.repository.ProductRepository;
import com.example.DWShopProject.repository.ProductTypeMgmtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SearchService {
    private final ProductRepository productRepository;
    private final ProductTypeMgmtRepository productTypeMgmtRepository;

    /**
     * 상품명을 포함한 검색을 수행합니다.
     * @param keyword 검색할 키워드
     * @return 검색된 상품 리스트와 결과 개수를 포함한 SearchResultDto
     */
    @Transactional(readOnly = true)
    public SearchResultDto searchByProductNameContaining(String keyword) {
        List<Product> products = productRepository.findByProductNameContaining(keyword);
        return createSearchResultDto(products);
    }

    /**
     * 서브 타입 및 메인 타입으로 상품을 검색합니다.
     * @param keyword 검색할 타입의 display name
     * @return 검색된 상품 리스트와 결과 개수를 포함한 SearchResultDto
     */
    @Transactional(readOnly = true)
    public SearchResultDto searchByProductType(String keyword) {
        List<Product> products = searchBySubTypeAndMainType(keyword, new HashSet<>());
        return createSearchResultDto(products);
    }

    /**
     * 전체보기를 위한 검색을 수행합니다.
     * 상품명, 설명, 카테고리를 포함한 검색을 수행합니다.
     * @param keyword 검색할 키워드
     * @return 검색된 상품 리스트와 결과 개수를 포함한 SearchResultDto
     */
    @Transactional(readOnly = true)
    public SearchResultDto searchAll(String keyword) {
        List<Product> products = new ArrayList<>(); // List를 사용하여 결과 저장
        Set<ProductTypeEnum> foundSubTypes = new HashSet<>(); // 검색된 서브 타입 저장 (중복 방지용)

        // 상품명 및 설명으로 검색
        products.addAll(productRepository.findByProductNameContaining(keyword));
        products.addAll(productRepository.findByExplanationContaining(keyword));

        // 서브 타입 및 메인 타입으로 검색
        products.addAll(searchBySubTypeAndMainType(keyword, foundSubTypes));

        // 중복 제거
        products = products.stream().distinct().collect(Collectors.toList());

        return createSearchResultDto(products);
    }

    /**
     * 검색 결과 리스트를 받아 SearchResultDto를 생성합니다.
     * @param products 검색된 상품 리스트
     * @return 검색 결과를 포함한 SearchResultDto
     */
    private SearchResultDto createSearchResultDto(List<Product> products) {
        List<SearchDto> searchResults = products.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());

        return SearchResultDto.builder()
                .results(searchResults)
                .totalResults(searchResults.size())
                .build();
    }

    /**
     * 주어진 displayName을 포함하는 서브 타입을 검색하고, 해당 서브 타입을 가진 상품 리스트를 반환합니다.
     * 검색된 서브 타입은 foundSubTypes Set에 저장하여 중복 검색을 방지합니다.
     *
     * @param displayName 검색할 서브 타입의 displayName
     * @param foundSubTypes 검색된 서브 타입을 저장하는 Set
     * @return 검색된 상품 리스트
     */
    private List<Product> searchBySubTypeDisplayName(String displayName, Set<ProductTypeEnum> foundSubTypes) {
        return Arrays.stream(ProductTypeEnum.values())
                .filter(subType -> subType.getDisplayName().contains(displayName)) // displayName을 포함하는 서브 타입 필터링
                .flatMap(subType -> {
                    foundSubTypes.add(subType); // 검색된 서브 타입을 Set에 추가하여 중복 방지
                    return productRepository.findByProductType(subType).stream(); // 해당 서브 타입을 가진 상품 검색
                })
                .collect(Collectors.toList()); // 결과를 리스트로 수집
    }

    /**
     * 주어진 키워드로 서브 타입 및 메인 타입을 검색하고, 해당 타입을 가진 상품 리스트를 반환합니다.
     * @param keyword 검색할 키워드
     * @param foundSubTypes 검색된 서브 타입을 저장하는 Set
     * @return 검색된 상품 리스트
     */
    private List<Product> searchBySubTypeAndMainType(String keyword, Set<ProductTypeEnum> foundSubTypes) {
        List<Product> products = new ArrayList<>();

        // 서브 타입으로 검색
        products.addAll(searchBySubTypeDisplayName(keyword, foundSubTypes));

        // 메인 타입으로 검색 (displayName에 keyword가 포함된 메인 타입)
        List<ProductTypeEnum> additionalSubTypes = new ArrayList<>();
        for (ParentTypeEnum parentTypeEnum : ParentTypeEnum.values()) {
            if (parentTypeEnum.getDisplayName().contains(keyword)) {
                List<ProductTypeMgmt> productTypeMgmtList = productTypeMgmtRepository.findByParentType(parentTypeEnum);
                for (ProductTypeMgmt productTypeMgmt : productTypeMgmtList) {
                    ProductTypeEnum subType = productTypeMgmt.getProductType();
                    if (!foundSubTypes.contains(subType)) {
                        additionalSubTypes.add(subType);
                    }
                }
            }
        }

        // 추가 서브 타입으로 검색
        products.addAll(productRepository.findByProductTypeIn(additionalSubTypes));

        return products;
    }

    private SearchDto mapToDto(Product product) {
        return SearchDto.builder()
                .id(product.getId())
                .productType(product.getProductType())
                .productName(product.getProductName())
                .price(product.getPrice())
                .explanation(product.getExplanation())
                .imageUrl(product.getImageUrl())
                .build();
    }
}
