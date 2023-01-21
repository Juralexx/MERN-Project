import React from 'react'
import styled from 'styled-components'

const Pagination = (props) => {
    return (
        <PaginationContainer>
            {props.children}
        </PaginationContainer>
    )
}

export default Pagination

const PaginationContainer = styled.div`
    display         : flex;
    align-items     : center;
    justify-content : center;
    padding         : 30px 0;

    .pagination {
        display : inline-block;

        a {
            display         : flex;
            align-items     : center;
            justify-content : center;
            height          : 36px;
            width           : 36px;
            color           : var(--text);
            float           : left;
            border-radius   : var(--rounded-md);

            &.active {
                background-color : rgba(var(--primary-rgb), 0.2);
                color            : var(--primary);
                font-weight      : 500;
            }

            &.hidden {
                display : none;
            }

            &.arrow {
                width : 28px;
                svg {
                    height : 22px;
                    width  : 22px;
                }
            }

            &:hover {
                &:not(.active):not(.arrow) {
                    background-color : rgba(var(--primary-rgb), 0.2);
                    color            : var(--primary);
                }
                &.arrow {
                    svg {
                        color : var(--primary);
                    }
                }
            }
        }
    }
`