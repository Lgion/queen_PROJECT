import React from 'react';
import { WrapperRaw } from '../../wrappers';

const _data = {
  currentPage: 1,
  totalPages: 5,
  display: {
    size: null,
    alignment: "start",
    icons: true,
    showNumbers: true
  },
  labels: {
    previous: "Previous",
    next: "Next",
    aria: "Page navigation"
  },
  icons: {
    previous: "«",
    next: "»"
  },
  onPageChange: null,
  maxVisible: null,
  ellipsis: true,
  boundaryLinks: true
};

export default ({ _, children, $ = _data }) => {
  const {
    currentPage=_data.currentPage,
    totalPages=_data.totalPages,
    display=_data.display,
    labels=_data.labels,
    icons=_data.icons,
    onPageChange=_data.onPageChange,
    maxVisible=_data.maxVisible,
    ellipsis=_data.ellipsis,
    boundaryLinks=_data.boundaryLinks
  } = $ || _ || children;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage && onPageChange) {
      onPageChange(page);
    }
  };

  const handleKeyPress = (event, page) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handlePageChange(page);
    }
  };

  // Calcul des pages à afficher avec ellipsis
  const getVisiblePages = () => {
    if (!maxVisible || totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    if (boundaryLinks && start > 1) {
      pages.push(1);
      if (ellipsis && start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (boundaryLinks && end < totalPages) {
      if (ellipsis && end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationClasses = [
    'pagination',
    display.size && `pagination-${display.size}`,
    display.alignment !== 'start' && `justify-content-${display.alignment}`
  ].filter(Boolean).join(' ');

  const renderPageItem = (content, page, isActive = false, isDisabled = false) => {
    const itemClasses = [
      'page-item',
      isActive && 'active',
      isDisabled && 'disabled'
    ].filter(Boolean).join(' ');

    return (
      <WrapperRaw $={{
        elm: "li",
        className: itemClasses
      }}>
        <WrapperRaw $={{
          elm: "a",
          className: "page-link",
          props: {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              if (!isDisabled) handlePageChange(page);
            },
            onKeyPress: (e) => handleKeyPress(e, page),
            tabIndex: isDisabled ? -1 : 0,
            role: "button",
            'aria-current': isActive ? 'page' : undefined,
            'aria-disabled': isDisabled ? 'true' : undefined,
            'aria-label': typeof content === 'number' ? `Page ${content}` : content
          }
        }}>
          {content}
        </WrapperRaw>
      </WrapperRaw>
    );
  };

  const visiblePages = getVisiblePages();

  return (
    <WrapperRaw $={{
      elm: "nav",
      props: {
        'aria-label': labels.aria
      }
    }}>
      <WrapperRaw $={{
        elm: "ul",
        className: paginationClasses
      }}>
        {/* Bouton Previous */}
        {renderPageItem(
          display.icons ? icons.previous : labels.previous,
          currentPage - 1,
          false,
          currentPage === 1
        )}

        {/* Pages numérotées */}
        {display.showNumbers && visiblePages.map((page, index) => (
          typeof page === 'number' 
            ? renderPageItem(page, page, page === currentPage)
            : <li key={`ellipsis-${index}`} className="page-item disabled">
                <span className="page-link">...</span>
              </li>
        ))}

        {/* Bouton Next */}
        {renderPageItem(
          display.icons ? icons.next : labels.next,
          currentPage + 1,
          false,
          currentPage === totalPages
        )}
      </WrapperRaw>
    </WrapperRaw>
  );
};
