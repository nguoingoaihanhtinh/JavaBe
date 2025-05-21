package com.foodapp.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class PaginationDto<T> {
    public String status;
    public List<T> data;
    public PaginationInfo pagination;

    @Getter
    @Setter
    public static class PaginationInfo {
        public int currentPage;
        public int pageSize;
        public long totalItems;
        public int totalPages;

        public static PaginationInfo of(int currentPage, int pageSize, long totalItems) {
            PaginationInfo info = new PaginationInfo();
            info.currentPage = currentPage;
            info.pageSize = pageSize;
            info.totalItems = totalItems;
            info.totalPages = (int) Math.ceil(totalItems / (double) pageSize);
            return info;
        }
    }

    public static <T> PaginationDto<T> of(List<T> data, int currentPage, int pageSize, long totalItems) {
        PaginationDto<T> dto = new PaginationDto<>();
        dto.status = "success";
        dto.data = data;
        dto.pagination = PaginationInfo.of(currentPage, pageSize, totalItems);
        return dto;
    }
}