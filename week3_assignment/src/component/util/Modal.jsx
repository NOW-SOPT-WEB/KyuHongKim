import styled from "@emotion/styled";
import React from "react";
const Modal = ({ modalRef, modalCloseHandler }) => {
    return (
        <ModalWrapper
            ref={modalRef}
            className="px-20 py-10 outline-none text-lg font-semibold backdrop:bg-black backdrop:opacity-70"
        >
            <ModalLayout>
                <ModalTitle>🔥 카드 까뒤집기 성공 🔥</ModalTitle>
                <RtnGameBtn
                    onClick={modalCloseHandler}
                    className="mx-auto px-5 py-2 w-full bg-red-400 outline-none"
                >
                    게임으로 돌아가기
                </RtnGameBtn>
            </ModalLayout>
        </ModalWrapper>
    );
};
const ModalWrapper = styled.dialog`
    width: 20rem;
    height: 10rem;
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 1rem;
    border: 0;
`;
const ModalLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`;
const ModalTitle = styled.h1`
    font-size: ${({ theme }) => theme.fonts.xl};
    color: white;
    margin-top: 1rem;
`;
const RtnGameBtn = styled.button`
    margin-top: 2rem;
    width: 15rem;
    height: 3rem;
    color: white;
    font-size: ${({ theme }) => theme.fonts.md};
    background-color: ${({ theme }) => theme.colors.indigo};
    cursor: pointer;
    border: 0;
    border-radius: 1rem;
`;
export default Modal;
