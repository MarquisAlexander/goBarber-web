import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;
            transition: transform 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')};
                transform: translate3d(5px, -5px, -5px);
            }
        }
    }
`;

export default AvatarInput = styled.div`
    margin-bottom: 32px;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;

    }
`;

