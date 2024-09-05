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
    queryFn: () => program.account.certifai.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['certifai', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ certifai: keypair.publicKey })
        .signers([keypair])
        .rpc(),
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
    initialize,
  };
}

export function useCertifaiProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useCertifaiProgram();

  const accountQuery = useQuery({
    queryKey: ['certifai', 'fetch', { cluster, account }],
    queryFn: () => program.account.certifai.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['certifai', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ certifai: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['certifai', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ certifai: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['certifai', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ certifai: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['certifai', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ certifai: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
