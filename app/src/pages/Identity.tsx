import React, { useState } from 'react';
import { Container, Card, CardContent, Button, Typography, FormControl, TextField } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite } from 'wagmi';
import { parseEther } from 'viem';

import IdentityAbi from '../assets/identity/Identity.json';

function IdentityPage() {
    const [textAddress, setTextAddress] = useState('');
    const handleAddress = (event: any) => setTextAddress(event.target.value);
    const [textProfileName, setTextProfileName] = useState('');
    const handleProfileName = (event: any) => setTextProfileName(event.target.value);

    const { address } = useAccount();
    const contractAddressIdentity = '0xefE0283e84a931b9522a68d0Beb16Bb116556cc9';
    const { data: getDataIdentity } = useContractRead({
        address: contractAddressIdentity,
        abi: IdentityAbi as any,
        functionName: 'dataIdentity',
        args: [textAddress]
    });
    
    const { config: configIdentity } = usePrepareContractWrite({
      address: contractAddressIdentity,
      abi: IdentityAbi,
      functionName: 'newDataIdentity',
      args: [textProfileName]
  });
  const { write: writeNewDataIdentity } = useContractWrite(configIdentity);
  console.log({ getDataIdentity });
    return (
        <Container fixed>
        <ConnectButton />
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Identity (Data Identity)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <Typography gutterBottom variant="h5" component="div">
                            Profile Name: { getDataIdentity && String(getDataIdentity) != '' ? getDataIdentity : '-' }
                        </Typography>
                        <TextField
                            value={textAddress}
                            onChange={handleAddress}
                            label="Input Address" type="text" size='medium' />
                    </FormControl>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Identity (New Data Identity)
                    </Typography>
                </CardContent>
                <CardContent>
                    <FormControl>
                        <TextField
                            value={textProfileName}
                            onChange={handleProfileName}
                            label="Input Profile Name" type="text" size='medium' />
                        <Button
                            onClick={writeNewDataIdentity}
                            variant="contained">Submit</Button>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}

export { IdentityPage };