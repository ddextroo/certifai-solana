#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4ZV9Raw5ZQy2pJpUqiHRr1DMWw2fr4J7yfJjus8gAtGK");

#[program]
pub mod certifai {
    use super::*;

  pub fn close(_ctx: Context<CloseCertifai>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.certifai.count = ctx.accounts.certifai.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.certifai.count = ctx.accounts.certifai.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCertifai>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.certifai.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCertifai<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Certifai::INIT_SPACE,
  payer = payer
  )]
  pub certifai: Account<'info, Certifai>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCertifai<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub certifai: Account<'info, Certifai>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub certifai: Account<'info, Certifai>,
}

#[account]
#[derive(InitSpace)]
pub struct Certifai {
  count: u8,
}
