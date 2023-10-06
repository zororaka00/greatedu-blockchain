import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography, FormControl, TextField, Select, MenuItem } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import NftExampleAbi from '../assets/nft/NftExample.json';

function NFTPage() {
    const [textMintAddress, setTextMintAddress] = useState('');
    const handleMintAddress = (event: any) => setTextMintAddress(event.target.value);
    const [textFromAddress, setTextFromAddress] = useState('');
    const handleFromAddress = (event: any) => setTextFromAddress(event.target.value);
    const [textToAddress, setTextToAddress] = useState('');
    const handleToAddress = (event: any) => setTextToAddress(event.target.value);
    const [textTokenId, setTextTokenId] = useState('');
    const handleTokenId = (event: any) => setTextTokenId(event.target.value);
    const [textOperator, setTextOperator] = useState('');
    const handleOperator = (event: any) => setTextOperator(event.target.value);
    const [textApproved, setApproved] = useState(0);
    const handleApproved = (event: any) => setApproved(event.target.value);

    const { address } = useAccount();
    const contractAddressNftExample = '0xc21d0A58a4FF3ab84EFe87993edA0473DFDA930C';
    const { data: dataBalanceOf } = useContractRead({
        address: contractAddressNftExample,
        abi: NftExampleAbi as any,
        functionName: 'balanceOf',
        args: [address as any]
    });
    
    const { config: configMintTo } = usePrepareContractWrite({
      address: contractAddressNftExample,
      abi: NftExampleAbi,
      functionName: 'mintTo',
      args: [textMintAddress]
  });
  const { write: writeMintTo } = useContractWrite(configMintTo);
    
  const { config: configTransferFrom } = usePrepareContractWrite({
    address: contractAddressNftExample,
    abi: NftExampleAbi,
    functionName: 'transferFrom',
    args: [textFromAddress, textToAddress, textTokenId]
});
const { write: writeTransferFrom } = useContractWrite(configTransferFrom);
    
const { config: configSetApprovalForAll } = usePrepareContractWrite({
  address: contractAddressNftExample,
  abi: NftExampleAbi,
  functionName: 'setApprovalForAll',
  args: [textOperator, textApproved == 1 ? true : false]
});
const { write: writeSetApprovalForAll } = useContractWrite(configSetApprovalForAll);
  console.log({ dataBalanceOf });
    return (
        <Container fixed>
        <ConnectButton />
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        NFT (Mint)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <Typography gutterBottom variant="h5" component="div">
                            BalanceOf: { Number(dataBalanceOf) }
                        </Typography>
                        <TextField
                            value={textMintAddress}
                            onChange={handleMintAddress}
                            label="Input Mint Address" type="text" size='medium' />
                        <Button
                            onClick={writeMintTo}
                            variant="contained">Minting NFT</Button>
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        NFT (Transfer From)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textFromAddress}
                            onChange={handleFromAddress}
                            label="Input From Address" type="text" size='medium' />
                        <TextField
                            value={textToAddress}
                            onChange={handleToAddress}
                            label="Input To Address" type="text" size='medium' />
                        <TextField
                            value={textTokenId}
                            onChange={handleTokenId}
                            label="Input Token Id" type="text" size='medium' />
                        <Button
                            onClick={writeTransferFrom}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        NFT (Set Approval For All)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textOperator}
                            onChange={handleOperator}
                            label="Input Operator Address" type="text" size='medium' />
                        <Select
                          value={textApproved}
                          onChange={handleApproved}
                        >
                          <MenuItem value={1}>True</MenuItem>
                          <MenuItem value={0}>False</MenuItem>
                        </Select>
                        <Button
                            onClick={writeSetApprovalForAll}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}

export { NFTPage };