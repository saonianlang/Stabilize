import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Heading, Text, Flex } from '@pancakeswap-libs/uikit'

interface PageHeaderProps {
  title: ReactNode
  lumpSum?: ReactNode
  userSum?: ReactNode
  children?: ReactNode
}

const StyledHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`

const Details = styled.div`
  flex: 1;
`

const PrivatePlacementHeader = ({ title, userSum, lumpSum, children }: PageHeaderProps) => {

  return (
    <StyledHeader>
      <Flex alignItems="center">
        <Details>
          <Heading mb="8px">{title}</Heading>
          {lumpSum && (
            <Text color="textSubtle" fontSize="14px">
              私募总额：{lumpSum} BNB
            </Text>
          )}
          {userSum && (
            <Text color="textSubtle" fontSize="14px">
              我的私募金额：{userSum} BNB
            </Text>
          )}
        </Details>
      </Flex>
      {children && <Text mt="16px">{children}</Text>}
    </StyledHeader>
  )
};
export default PrivatePlacementHeader