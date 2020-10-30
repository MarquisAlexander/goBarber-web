import styled, { css } from 'styled-components';

import Tooltip from '../Tootip';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    border: 2px solid #232129;
    padding: 16px;
    width: 100%;
    color: #666360;

    display: flex;
    align-items: center;
    transition: transform 0.3s;

    &:hover {
        transform: translate3d(5px, -5px, -5px);
        border-color: #ff9000;
    }

    & + div {
            margin-top: 8px;
        }

    ${(props) => props.isErrored && css`
        border-color: #c53030;
    `}
    
    ${(props) => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${(props) => props.isFilled && css`
        color: #ff9000;
    `}

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #F4EDE8;
        /* transition: transform 0.3s; */

        &::placeholder {
            color: #666360;
        }

        &:hover {
            /* transform: translate3d(5px, -5px, -5px); */
        }
    }

    svg {
        margin-right: 16px;
    }
`;

export const Error = styled(Tooltip)`
    height: 20px;
    margin-left: 16px;
    svg {
        margin: 0;
    }

    span {
        background: #c53030;
        color: #FFF;

        &::before {
            border-color: #c53030 transparent;
        }
    }
`;