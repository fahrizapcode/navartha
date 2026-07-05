#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, String, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Brand {
    pub name: String,
    pub owner: Address,
    pub timestamp: u64,
    pub status: String,
    pub verified: bool,
    pub approved_at: u64,
    pub approver: Address,
}

const BRANDS_KEY: Symbol = symbol_short!("BRANDS");

#[contract]
pub struct BrandRegistry;

#[contractimpl]
impl BrandRegistry {
    /// Register a new brand. Status starts as "Pending".
    pub fn register_brand(env: Env, owner: Address, name: String) {
        owner.require_auth();

        let status = String::from_str(&env, "Pending");
        let zero_addr = owner.clone(); // placeholder for approver until approved

        let brand = Brand {
            name: name.clone(),
            owner: owner.clone(),
            timestamp: env.ledger().timestamp(),
            status,
            verified: false,
            approved_at: 0,
            approver: zero_addr,
        };

        // Store individual brand mapping by (owner, name)
        let key = (owner.clone(), name.clone());
        env.storage().persistent().set(&key, &brand);

        // Append to global brands list or update existing
        let mut all_brands: Vec<Brand> = env
            .storage()
            .persistent()
            .get(&BRANDS_KEY)
            .unwrap_or(Vec::new(&env));
            
        let mut found = false;
        let mut i: u32 = 0;
        let len = all_brands.len();
        while i < len {
            let existing = all_brands.get(i).unwrap();
            if existing.owner == owner && existing.name == name {
                all_brands.set(i, brand.clone());
                found = true;
                break;
            }
            i += 1;
        }
        
        if !found {
            all_brands.push_back(brand.clone());
        }
        
        env.storage().persistent().set(&BRANDS_KEY, &all_brands);

        // Publish BrandRegistered event
        let topics = (Symbol::new(&env, "BrandRegistered"), owner);
        env.events().publish(topics, brand);
    }

    /// Approve a registered brand. Sets status to "Approved" and marks verified.
    pub fn approve_brand(env: Env, admin: Address, owner: Address, name: String) {
        admin.require_auth();

        let key = (owner.clone(), name.clone());

        // Fetch the existing brand
        let mut brand: Brand = env
            .storage()
            .persistent()
            .get(&key)
            .expect("Brand not found");

        // Update approval fields
        brand.status = String::from_str(&env, "Approved");
        brand.verified = true;
        brand.approved_at = env.ledger().timestamp();
        brand.approver = admin.clone();

        // Update individual brand mapping
        env.storage().persistent().set(&key, &brand);

        // Update global brands list
        let mut all_brands: Vec<Brand> = env
            .storage()
            .persistent()
            .get(&BRANDS_KEY)
            .unwrap_or(Vec::new(&env));

        let mut i: u32 = 0;
        let len = all_brands.len();
        while i < len {
            let existing = all_brands.get(i).unwrap();
            if existing.owner == owner && existing.name == name {
                all_brands.set(i, brand.clone());
                break;
            }
            i += 1;
        }
        env.storage().persistent().set(&BRANDS_KEY, &all_brands);

        // Publish BrandApproved event
        let topics = (Symbol::new(&env, "BrandApproved"), admin, owner);
        env.events().publish(topics, brand);
    }

    /// Get brand by owner and name
    pub fn get_brand(env: Env, owner: Address, name: String) -> Option<Brand> {
        let key = (owner, name);
        env.storage().persistent().get(&key)
    }

    /// Get all registered brands
    pub fn get_all_brands(env: Env) -> Vec<Brand> {
        env.storage()
            .persistent()
            .get(&BRANDS_KEY)
            .unwrap_or(Vec::new(&env))
    }
}
