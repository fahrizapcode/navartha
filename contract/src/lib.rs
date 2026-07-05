#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Brand {
    pub name: String,
    pub owner: Address,
    pub timestamp: u64,
}

const BRANDS_KEY: Symbol = symbol_short!("BRANDS");

#[contract]
pub struct BrandRegistry;

#[contractimpl]
impl BrandRegistry {
    /// Register a new brand
    pub fn register_brand(env: Env, owner: Address, name: String) {
        owner.require_auth();

        let brand = Brand {
            name: name.clone(),
            owner: owner.clone(),
            timestamp: env.ledger().timestamp(),
        };

        // Store individual brand mapping
        env.storage().persistent().set(&owner, &brand);

        // Append to global brands list
        let mut all_brands: Vec<Brand> = env
            .storage()
            .persistent()
            .get(&BRANDS_KEY)
            .unwrap_or(Vec::new(&env));
        all_brands.push_back(brand.clone());
        env.storage().persistent().set(&BRANDS_KEY, &all_brands);

        // Publish event
        let topics = (Symbol::new(&env, "BrandRegistered"), owner);
        env.events().publish(topics, brand);
    }

    /// Get brand by owner
    pub fn get_brand(env: Env, owner: Address) -> Option<Brand> {
        env.storage().persistent().get(&owner)
    }

    /// Get all registered brands
    pub fn get_all_brands(env: Env) -> Vec<Brand> {
        env.storage()
            .persistent()
            .get(&BRANDS_KEY)
            .unwrap_or(Vec::new(&env))
    }
}
