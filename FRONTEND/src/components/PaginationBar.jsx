import { Pagination } from "react-bootstrap"

export const PaginationBar = ({currentPage, totalPages, onPageChange}) => {
    if (totalPages <= 1) {
        return null
    }
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    return (
        <Pagination className="justify-content-center m-4">
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            />
            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    active={page === currentPage}
                    onClick={() => onPageChange(page)}>
                    {page}
                </Pagination.Item>
            ))}
            <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            />
        </Pagination>
    )
}