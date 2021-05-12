import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    modalWrapper: {
        justifyContent: "flex-end",
    },
    modal: {
        padding: 12,
        borderRadius: 6,
        backgroundColor: "#FFF",
    },
    modalTitle: {
        fontSize: 24,
        borderBottomWidth: 2,
        borderColor: "#000",
    },
    inputs: {
        marginTop: 16,
    },
    inputTitle: {
        fontSize: 16,
    },
    input: {
        backgroundColor: "#eee",
        borderRadius: 4,
        padding: 8,
        fontSize: 16,
        marginBottom: 8,
    },
    radioWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 12,
    },
    buttonWrapper: {
        marginBottom: 12,
    },
    tip: {
        fontSize: 18,
    }
});