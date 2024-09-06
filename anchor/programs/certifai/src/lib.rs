#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("4ZV9Raw5ZQy2pJpUqiHRr1DMWw2fr4J7yfJjus8gAtGK");

#[program]
pub mod certifai {
    use super::*;

    pub fn create_entry(
        ctx: Context<CreateEntry>,
        first_name: String,
        last_name: String,
        email_address: String,
        school_name: String,
        user_role: String,
    ) -> Result<()> {
        msg!("User Entry Created");
        msg!("Name: {} {}", first_name, last_name);
        msg!("Email Address: {}", email_address);

        let user_entry = &mut ctx.accounts.user_entry;
        user_entry.owner = ctx.accounts.owner.key();
        user_entry.first_name = first_name;
        user_entry.last_name = last_name;
        user_entry.email_address = email_address;
        user_entry.school_name = school_name;
        user_entry.user_role = user_role;
        Ok(())
    }

    pub fn update_entry(
        ctx: Context<UpdateEntry>,
        first_name: String,
        last_name: String,
        email_address: String,
        school_name: String,
        user_role: String,
    ) -> Result<()> {
        msg!("user Entry Updated");
        msg!("Name: {} {}", first_name, last_name);
        msg!("Email Address: {}", email_address);

        let user_entry = &mut ctx.accounts.user_entry;
        user_entry.first_name = first_name;
        user_entry.last_name = last_name;
        user_entry.email_address = email_address;
        user_entry.school_name = school_name;
        user_entry.user_role = user_role;

        Ok(())
    }

    pub fn delete_entry(_ctx: Context<DeleteEntry>, email_address: String) -> Result<()> {
        msg!("User entry email_addressd {} deleted", email_address);
        Ok(())
    }
}
#[account]
#[derive(InitSpace)]
pub struct UserEntryState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub first_name: String,
    #[max_len(50)]
    pub last_name: String,
    #[max_len(50)]
    pub email_address: String,
    #[max_len(150)]
    pub school_name: String,
    #[max_len(150)]
    pub user_role: String,
}

#[derive(Accounts)]
#[instruction(email_address: String,first_name: String,last_name: String,school_name: String, user_role: String)]
pub struct CreateEntry<'info> {
    #[account(
        init,
        seeds = [email_address.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + UserEntryState::INIT_SPACE
    )]
    pub user_entry: Account<'info, UserEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(email_address: String,first_name: String,last_name: String,school_name: String, user_role: String)]
pub struct UpdateEntry<'info> {
    #[account(
        mut,
        seeds = [email_address.as_bytes(), owner.key().as_ref()],
        bump,
        realloc = 8 + 32 + 1 + 4 + email_address.len() + 4 + first_name.len()+ 4 + last_name.len()+ 4 + school_name.len()+ 4 + user_role.len(),
        realloc::payer = owner,
        realloc::zero = true,
    )]
    pub user_entry: Account<'info, UserEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(email_address: String)]
pub struct DeleteEntry<'info> {
    #[account(
        mut,
        seeds = [email_address.as_bytes(), owner.key().as_ref()],
        bump,
        close = owner,
    )]
    pub user_entry: Account<'info, UserEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}
