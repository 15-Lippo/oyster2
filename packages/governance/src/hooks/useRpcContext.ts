import { useConnectionConfig, useConnection, useWallet } from '@oyster/common';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IWallet, RpcContext } from '../models/api';

const GOV_PROGRAM_ID = 'AVoAYTs36yB5izAaBkxRG67wL1AMwG3vo41hKtUSb8is';

export function useRpcContext() {
  const { endpoint } = useConnectionConfig();
  const connection = useConnection();
  const { wallet } = useWallet();
  const location = useLocation();

  const programId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('programId') ?? GOV_PROGRAM_ID;
  }, [location]);

  const [rpcContext, setRpcContext] = useState(
    new RpcContext(
      new PublicKey(programId),
      wallet as IWallet,
      connection,
      endpoint,
    ),
  );

  useEffect(
    () => {
      setRpcContext(
        new RpcContext(
          new PublicKey(programId),
          wallet as IWallet,
          connection,
          endpoint,
        ),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [programId, connection, wallet, endpoint],
  );

  return rpcContext;
}
