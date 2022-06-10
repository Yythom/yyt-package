import React, { memo } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

export const LoadList = memo(({
    loading,
    children,
    next_page,
    noMore,
}: {
    children: React.ReactNode,
    loading: boolean,
    next_page: Function,
    noMore: boolean
}) => {
    return (
        <div
            className="pro-list"
            style={{
                overflow: 'auto',
                paddingBottom: '3rem',
                boxSizing: 'border-box',
                height: 'calc(100% - 17rem - 9rem)',
                borderRadius: '3rem',
            }}
        >
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                threshold={10}
                loadMore={async () => {
                    if (!loading) {
                        next_page()
                    }
                }}
                hasMore={!loading && !noMore}
                useWindow={false}
            >
                {children}
                {loading && (
                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        loading
                    </div>
                )}
                {noMore && (
                    <div style={{ textAlign: 'center', padding: '2rem 0 1rem 0' }}>
                        没有更多了
                    </div>
                )}
            </InfiniteScroll>
        </div>
    )
})
