
import React from 'react'
import Container from 'components/Container'
import {Wrapper} from 'components/swap/styleds'
import SharesPageHeader from 'components/shares/SharesPageHeader'
import AppBody from '../AppBody'

const Shares = () => {
    const title = '股权众筹';
    const description = 'asdasdasdasd';
    return (
        <Container>
            <AppBody>
                <Wrapper id="swap-page">
                    <SharesPageHeader title={title} description={description}  />
                </Wrapper>
            </AppBody>
        </Container>
    )
}

export default Shares