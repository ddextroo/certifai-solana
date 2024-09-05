// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import CertifaiIDL from '../target/idl/certifai.json';
import type { Certifai } from '../target/types/certifai';

// Re-export the generated IDL and type
export { Certifai, CertifaiIDL };

// The programId is imported from the program IDL.
export const CERTIFAI_PROGRAM_ID = new PublicKey(CertifaiIDL.address);

// This is a helper function to get the Certifai Anchor program.
export function getCertifaiProgram(provider: AnchorProvider) {
  return new Program(CertifaiIDL as Certifai, provider);
}

// This is a helper function to get the program ID for the Certifai program depending on the cluster.
export function getCertifaiProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return CERTIFAI_PROGRAM_ID;
  }
}
