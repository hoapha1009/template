// I. Riêng
export const ComponentDiv = styled.div`
    font-size: 16px;
`;
// <Link to='/' class="ComponentLink" />
export const ComponentLink = styled(Link)`
    font-size: 16px;
`;
// - Dùng biến:
export const ComponentLink = styled(Link)`
    font-size: ${({ isBig }) =>
        isBig ? "font-size: 32px;" : "font-size: 16px;"};
`;

// II. Dùng chung
// import {css} from 'styled-components'
const OptionContainerStyles = css`code`;

const OptionLink = styled(Link)`
    ${OptionContainerStyles}
`;

const OptionDiv = styled.div`
    ${OptionContainerStyles}
`;
