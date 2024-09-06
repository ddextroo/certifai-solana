'use client';

import {
  getCertifaiProgram,
  getCertifaiProgramId,
} from '@certifai-solana/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

interface CreateEntryArgs {
  owner: PublicKey;
  first_name: string;
  last_name: string;
  email_address: string;
  school_name: string;
  user_role: string;
}
export function useCertifaiProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getCertifaiProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getCertifaiProgram(provider);

  const accounts = useQuery({
    queryKey: ['certifai', 'all', { cluster }],
    queryFn: () => program.account.userEntryState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ['certifai', 'create', { cluster }],
    mutationFn: async ({
      first_name,
      last_name,
      email_address,
      school_name,
      user_role,
      owner,
    }) => {
      const [userEntryAddress] = await PublicKey.findProgramAddress(
        [Buffer.from(email_address), owner.toBuffer()],
        programId
      );
      return program.methods
        .createEntry(
          first_name,
          last_name,
          email_address,
          school_name,
          user_role
        )
        .accounts({ certifaiEntry: userEntryAddress })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry,
  };
}

export function useCertifaiProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useCertifaiProgram();

  const accountQuery = useQuery({
    queryKey: ['certifai', 'fetch', { cluster, account }],
    queryFn: () => program.account.userEntryState.fetch(account),
  });

  return {
    accountQuery,
  };
}
