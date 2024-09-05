import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Certifai } from '../target/types/certifai';

describe('certifai', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Certifai as Program<Certifai>;

  const certifaiKeypair = Keypair.generate();

  it('Initialize Certifai', async () => {
    await program.methods
      .initialize()
      .accounts({
        certifai: certifaiKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([certifaiKeypair])
      .rpc();

    const currentCount = await program.account.certifai.fetch(
      certifaiKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Certifai', async () => {
    await program.methods
      .increment()
      .accounts({ certifai: certifaiKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.certifai.fetch(
      certifaiKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Certifai Again', async () => {
    await program.methods
      .increment()
      .accounts({ certifai: certifaiKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.certifai.fetch(
      certifaiKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Certifai', async () => {
    await program.methods
      .decrement()
      .accounts({ certifai: certifaiKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.certifai.fetch(
      certifaiKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set certifai value', async () => {
    await program.methods
      .set(42)
      .accounts({ certifai: certifaiKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.certifai.fetch(
      certifaiKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the certifai account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        certifai: certifaiKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.certifai.fetchNullable(
      certifaiKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
