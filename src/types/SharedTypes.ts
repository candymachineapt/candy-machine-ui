export type Attribute = {
    trait_type: string,
    value: string,
};

export type OffChainTokenData = {
    name: string,
    description: string,
    fee_recipient: string,
    seller_fee_basis_points: string,
    image: string,
    attributes: Attribute[],
};