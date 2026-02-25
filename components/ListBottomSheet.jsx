import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useBucketList } from "../context/BucketListContext";
import { useWishList } from "../context/WishListContext";

const ListBottomSheet = forwardRef(
  (
    {
      type = "wishlist", // "wishlist" | "bucket"
      mode = "create", // "create" | "edit"
      initialData = null,
      onOpen,
      onClose,
    },
    ref,
  ) => {
    /* ---------- Dimensions ---------- */
    const { height } = useWindowDimensions();

    /* ---------- Dynamic Snap Points ---------- */
    const snapPoints = useMemo(() => {
      // Smaller phones get taller sheet
      if (height < 700) return ["70%", "90%"];
      return ["45%", "70%"];
    }, [height]);

    /* ---------- Context ---------- */
    const { createWishList, updateWishList } = useWishList();
    const { createBucketList, updateBucketList } = useBucketList();

    /* ---------- State ---------- */
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [notes, setNotes] = useState("");

    /* ---------- Populate on Edit ---------- */
    useEffect(() => {
      if (mode === "edit" && initialData) {
        setName(initialData.name ?? "");
        setNotes(initialData.notes ?? "");
        setQuantity(initialData.quantity ? String(initialData.quantity) : "");
      }
    }, [mode, initialData]);

    /* ---------- Reset ---------- */
    const resetForm = () => {
      setName("");
      setQuantity("");
      setNotes("");
    };

    /* ---------- Submit ---------- */
    const handleSubmit = async () => {
      if (!name.trim()) return;

      const payload = {
        name,
        notes,
        ...(type === "bucket" && {
          quantity: Number(quantity) || 1,
        }),
      };

      if (type === "wishlist") {
        mode === "edit"
          ? await updateWishList(payload, initialData?.id)
          : await createWishList(payload);
      }

      if (type === "bucket") {
        mode === "edit"
          ? await updateBucketList(payload, initialData?.id)
          : await createBucketList(payload);
      }

      resetForm();
      ref?.current?.close();
    };

    /* ---------- Sheet Events ---------- */
    const handleSheetChange = useCallback(
      (index) => {
        if (index >= 0) onOpen?.();
        if (index === -1) onClose?.();
      },
      [onOpen, onClose],
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChange}
        backgroundStyle={{ backgroundColor: "#F9F8F3" }}
        handleIndicatorStyle={{
          backgroundColor: "#DDD",
          width: 60,
        }}
      >
        <BottomSheetScrollView
          keyboardShouldPersistTaps="handled"
          className="px-5 pb-8"
        >
          {/* ---------- Header ---------- */}
          <Text className="text-xl font-bold text-gray-900 mb-4">
            {type === "bucket" ? "Bucket List" : "Wish List"}
          </Text>

          {/* ---------- Name ---------- */}
          <TextInput
            placeholder={
              type === "bucket" ? "Item name (e.g. Snow jacket)" : "Wish title"
            }
            value={name}
            onChangeText={setName}
            className="bg-white rounded-2xl px-4 py-4 text-base mb-3 border border-gray-200"
          />

          {/* ---------- Quantity (Bucket only) ---------- */}
          {type === "bucket" && (
            <TextInput
              placeholder="Quantity"
              keyboardType="number-pad"
              value={quantity}
              onChangeText={setQuantity}
              className="bg-white rounded-2xl px-4 py-4 text-base mb-3 border border-gray-200"
            />
          )}

          {/* ---------- Notes ---------- */}
          <TextInput
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-white rounded-2xl px-4 py-4 text-base h-28 mb-5 border border-gray-200"
          />

          {/* ---------- Submit Button ---------- */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-[#E68619] rounded-2xl py-4 items-center"
          >
            <Text className="text-white text-base font-semibold">
              {mode === "edit" ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default ListBottomSheet;
