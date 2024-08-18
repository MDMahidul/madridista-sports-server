import { Schema, model } from 'mongoose';
import { TWishItem, TWishlist } from './wishlist.interface';

const WishItemSchema = new Schema<TWishItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const WishlistSchema = new Schema<TWishlist>(
  {
    user: {
      type: String,
      required: true,
    },
    items: [WishItemSchema],
  },
  {
    timestamps: true,
  },
);

export const Wishlist = model<TWishlist>('Wishlist', WishlistSchema);
