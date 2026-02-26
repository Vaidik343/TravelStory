import * as Network from 'expo-network';

export const isOnline = async () => {
    const state = await Network.getNetworkStateAsync();
    return state.isConnected && state.isInternetReachable;
};