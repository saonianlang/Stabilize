
import React, { useCallback, useState } from 'react'
import Container from 'components/Container'
import styled from 'styled-components'
import {Wrapper} from 'components/swap/styleds'
import PrivatePlacementHeader from 'components/privatePlacement/PrivatePlacementHeader'
import { Input as NumericalInput } from 'components/NumericalInput'
import { Button, CardBody } from '@pancakeswap-libs/uikit'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import { MaxUint256 } from '@ethersproject/constants'
import {BigNumber, utils} from 'ethers';
import TransactionConfirmationModal from 'components/TransactionConfirmationModal';
import AppBody from '../AppBody'
import { useAContract } from '../../hooks/useContract'
import POOL_ABI from '../../constants/abis/pool.json';
import TOKEN_ABI from '../../constants/abis/token.json';
import USDT_ABI from '../../constants/abis/usdt.json';
import { useActiveWeb3React } from '../../hooks/index';
import { useAddPopup } from '../../state/application/hooks';
import { privatePlacement } from '../../connectors'


const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`


const PrivatePlacement = () => {
    const title = '股权众筹';
    const disableCurrencySelect = false;

    const [lumpSum, setLumpSum] = useState('0');
    const [userSum, setUserSum] = useState('0');
    const [userBalance, setUserBalance] = useState('0');
    const [value, setValue] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [isApprove, setIsApprove] = useState(true);

    // 创建代币合约
    // 创建交易池合约
    const poolAddr = privatePlacement.pool;
    const tokenAddr = privatePlacement.token;
    const usdtAddr = privatePlacement.bnb;
    
    const poolContract = useAContract(poolAddr, POOL_ABI);
    const tokenContract = useAContract(tokenAddr, TOKEN_ABI);
    const usdtContract = useAContract(usdtAddr, USDT_ABI);
    
    const { account } = useActiveWeb3React();
    const addPopup = useAddPopup();

    // 消息框
    function showPopup (key: string, content: string, status: boolean) {
        addPopup(
            {
                txn: {
                    hash: key,
                    success: status,
                    summary: content,
                },
            },
            key
        )
    }
    // 交易
    async function sendTransaction() {
        try {
            setShowConfirm(true);
            const tx = poolContract ? await poolContract.buyGyro(utils.parseUnits(value, 6)): null; // 进行交易
            console.log(tx);
            const status = await tx.wait();
            setShowConfirm(false);
            console.log(status);
            showPopup('sendTransaction', 'Equity subscription success', true);
            getPrivatePlacementNumber();
            setValue('0')
        } catch (error) {
            showPopup('sendTransaction', 'transaction failed', false);
            console.error('transaction failed');
        }
    }

    // 获取总量显示
    async function getPrivatePlacementNumber() {
        if(lumpSum !== '0' && userSum !== '0') return;
        if(!tokenContract || !usdtContract) return;
        try {
            // 获取股权总额
            const total = tokenContract ? await tokenContract.balanceOf(poolAddr) : null;
            // 获取当前用户股权总额
            const userTotal = tokenContract ? await tokenContract.balanceOf(account) : null;
            // 获取我的BNB余额
            const userBnb = usdtContract ? await usdtContract.balanceOf(account) : null;
            // 获取BNB代币余额
            setLumpSum(utils.formatEther(total));
            setUserSum(utils.formatEther(userTotal));
            setUserBalance(utils.formatUnits(userBnb, 6));
        } catch (error) {
            console.log(error);
            console.error('Obtaining equity information failure');
        }
    }

    // 获取授权
    async function getApprove() {
        try {
            const isQuota = usdtContract ? await usdtContract.allowance(account, poolAddr) : null;
            if(BigNumber.isBigNumber(isQuota)) setIsApprove(true);
        } catch (error) {
            console.log(error);
            showPopup('getApprove', 'Get authorization information failed', false);
            console.error('Get authorization information failed');
        }
    }

    //  进行授权
    async function setApprove() {
        try {
            const quota = usdtContract ? await usdtContract.approve(poolAddr, MaxUint256) : null;
            if(BigNumber.isBigNumber(quota)) setIsApprove(true);
        } catch (error) {
            console.log(error);
            showPopup('setApprove', 'Authorization failed', false);
            console.error('Authorization failed');
        }
    }
    
    setInterval(() => {
        getPrivatePlacementNumber();
    }, 1000);
    getApprove();
    const handleDismissConfirmation = useCallback(() => {
        setShowConfirm(false)
    }, [])

    return (
        <Container>
            <AppBody>
                <Wrapper id="swap-page">
                    <TransactionConfirmationModal
                        isOpen={showConfirm}
                        onDismiss={handleDismissConfirmation}
                        attemptingTxn
                        hash=""
                        content={() => (<div> </div>)}
                        pendingText="Is the right to subscribe"
                    />
                    <PrivatePlacementHeader title={title} lumpSum={lumpSum} userSum={userSum}  />
                    <CardBody>
                        <AutoColumn gap="md">
                            <InputPanel>
                                <InputRow selected={disableCurrencySelect}>
                                    <NumericalInput
                                        className="token-amount-input"
                                        value={value}
                                        onUserInput={(val) => {
                                            setValue(val)
                                        }}
                                    />
                                    {userBalance && (
                                        <Button onClick={() => {
                                            setValue(userBalance)
                                        }} scale="sm" variant="text">
                                        MAX
                                        </Button>
                                    )}
                                </InputRow>
                            </InputPanel>
                            <RowBetween>
                                {
                                    !isApprove ? <Button onClick={setApprove} style={{ width: '100%' }}>授权</Button> : <Button onClick={sendTransaction} style={{ width: '100%' }}>购买</Button>
                                }
                            </RowBetween>
                        </AutoColumn>
                    </CardBody>
                </Wrapper>
            </AppBody>
        </Container>
    )
}

export default PrivatePlacement