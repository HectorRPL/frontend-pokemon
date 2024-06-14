import React, { ReactNode } from 'react'
import { Container } from 'react-bootstrap'

interface CustomContainerProps {
    children: ReactNode
}

const CustomContainer: React.FC<CustomContainerProps> = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default CustomContainer