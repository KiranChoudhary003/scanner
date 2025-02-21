import styled from "styled-components";

const Wrapper = styled.section`
width : 100vw;
height : 100vh;
color : white;

.scanner{
margin : 20px;
    h2{
        text-align : center;
        padding : 30px;
    }
    button{
        display : block;
        margin : auto;
        padding : 8px 5px;
        border-radius : 10px;
        background :rgb(99, 27, 244);
        color : white;
        margin-top : 100px;
    }
    video{
        border: 1px solid black;
        width : 100%;
        height : 300px;
        margin-top : 50px;
    }
}
`

export default Wrapper  