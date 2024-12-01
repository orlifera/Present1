import React, { useEffect, useState } from "react";
import { fetchWishes, updateWishes } from "../API/Helper";
import Wish from "./Wish";
import { WishType } from "../types";
import AddWishForm from "./AddWishForm";
import { unionBy } from "lodash";

const WishPage: React.FC = () => {
    const [wishes, setWishes] = useState<WishType[]>([]);
    const [sha, setSha] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const loadWishes = async () => {
        try {
            const { content, sha } = await fetchWishes();
            setWishes(content);
            setSha(sha);
        } catch (error) {
            console.error("Failed to fetch wishes:", error);
            setWishes([]);
        } finally {
            setLoading(false);
        }
    };

    console.log(sha);
    useEffect(() => {
        loadWishes();
    }, []);

    const fetchLatestSha = async () => {
        try {
            const { sha } = await fetchWishes();
            setSha(sha);
            return sha;
        } catch (error) {
            console.error("Failed to fetch latest SHA:", error);
            throw new Error("Could not fetch latest SHA");
        }
    };

    const handleUpdate = async (updatedWishes: WishType[]) => {
        if (isUpdating) return; // Prevent overlapping requests
        setIsUpdating(true);
        try {
            const latestSha = await fetchLatestSha(); // Get the latest SHA
            const { newSha } = await updateWishes(updatedWishes, latestSha);
            setWishes(updatedWishes);
            setSha(newSha);
        } catch (error) {
            console.error("Failed to update wishes:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleMarkAsDone = async (id: number) => {
        const updatedWishes = wishes.map((wish) =>
            wish.id === id ? { ...wish, isCompleted: true } : wish
        );
        await handleUpdate(updatedWishes);
    };

    const handleDeleteWish = async (id: number) => {
        const updatedWishes = wishes.filter((wish) => wish.id !== id);
        await handleUpdate(updatedWishes);
    };

    const onNewWishCreated = async (wish: WishType) => {
        const updatedWishes = unionBy([...wishes, wish], "id");
        await handleUpdate(updatedWishes);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <AddWishForm onSubmit={onNewWishCreated} />
            <div className="wrapper">
                <h1 className="title">My Wishlist</h1>
                <div className="wish-page">
                    <ul className="wish-list">
                        {Array.isArray(wishes) && wishes.length > 0 ? (
                            wishes.map((wish) => (
                                <li key={wish.id}>
                                    <Wish
                                        key={wish.id}
                                        {...wish}
                                        onMarkAsDone={handleMarkAsDone}
                                        onDelete={handleDeleteWish}
                                    />
                                </li>
                            ))
                        ) : (
                            <p>No wishes available.</p>
                        )}
                    </ul>
                </div >
            </div>
        </>
    );
};

export default WishPage;
