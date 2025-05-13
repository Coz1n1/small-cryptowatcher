export type Token = {
  id: number;
  name: string;
  symbol: string;
  current_price: number;
  is_favourite?: boolean;
  balance?: number;
};
