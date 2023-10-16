// Function to Calculate CFT
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export const calculateCft = async (length, girth, setList) => {
    const CFT = (length * girth * girth) / 2304;
    setList((prev) => {
        return [
            ...prev,
            {
                length: length,
                girth: girth,
                CFT: CFT,
            },
        ];
    });
};


// Function to categorize girth-wise
export const categorize = (list, setOneToEleven, setTwelveToSeventeen, setEighteenToTwentyThree, setTwentyFourToTwentyNine, setThirtyToThirtyFive, setThirtySixToFortySeven, setFortyEightAbove ) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].girth < 12 && list[i].girth > 0) {
            setOneToEleven((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth < 18) {
            setTwelveToSeventeen((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth < 24) {
            setEighteenToTwentyThree((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth < 30) {
            setTwentyFourToTwentyNine((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth < 36) {
            setThirtyToThirtyFive((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth < 48) {
            setThirtySixToFortySeven((prev) => {
                return [...prev, list[i]];
            });
        } else if (list[i].girth >= 48) {
            setFortyEightAbove((prev) => {
                return [...prev, list[i]];
            });
        }
    }
};

// Function to calculate total cft of each category
export const categoryTotalCFT = (oneToEleven, TwelveToSeventeen, EighteenToTwentyThree, TwentyFourToTwentyNine, ThirtyToThirtyFive, ThirtySixToFortySeven, FortyEightAbove, setOne, setTwo, setThree, setFour, setFive, setSix, setSeven) => {
    let temp = 0;
    let temp2 = 0;
    let temp3 = 0;
    let temp4 = 0;
    let temp5 = 0;
    let temp6 = 0;
    let temp7 = 0;
    for (let i = 0; i < oneToEleven.length; i++) {
        temp += +oneToEleven[i].CFT;
    }
    for (let i = 0; i < TwelveToSeventeen.length; i++) {
        temp2 += +TwelveToSeventeen[i].CFT;
    }
    for (let i = 0; i < EighteenToTwentyThree.length; i++) {
        temp3 += +EighteenToTwentyThree[i].CFT;
    }
    for (let i = 0; i < TwentyFourToTwentyNine.length; i++) {
        temp4 += +TwentyFourToTwentyNine[i].CFT;
    }
    for (let i = 0; i < ThirtyToThirtyFive.length; i++) {
        temp5 += +ThirtyToThirtyFive[i].CFT;
    }
    for (let i = 0; i < ThirtySixToFortySeven.length; i++) {
        temp6 += +ThirtySixToFortySeven[i].CFT;
    }
    for (let i = 0; i < FortyEightAbove.length; i++) {
        temp7 += +FortyEightAbove[i].CFT;
    }
    setOne(temp);
    console.log(temp);
    console.log(one);
    setTwo(temp2);
    setThree(temp3);
    setFour(temp4);
    setFive(temp5);
    setSix(temp6);
    setSeven(temp7);
};

export const getTotalPrice = (one, two, three, four, five, six, seven, setGrandPrice, setGrandCFT, oneToElevenPrice, TwelveToSeventeenPrice, EighteenToTwentyThreePrice, TwentyFourToTwentyNinePrice, ThirtyToThirtyFivePrice, ThirtySixToFortySevenPrice, FortyEightAbovePrice) => {
    const onePrice = +one * +oneToElevenPrice;
    const twoPrice = +two * +TwelveToSeventeenPrice;
    const threePrice = +three * +EighteenToTwentyThreePrice;
    const fourPrice = +four * +TwentyFourToTwentyNinePrice;
    const fivePrice = +five * +ThirtyToThirtyFivePrice;
    const sixPrice = +six * +ThirtySixToFortySevenPrice;
    const sevenPrice = +seven * +FortyEightAbovePrice;

    // Calculate the total price, considering undefined variables as 0
    const totalPrice =
        (onePrice ? onePrice : 0) +
        (twoPrice ? twoPrice : 0) +
        (threePrice ? threePrice : 0) +
        (fourPrice ? fourPrice : 0) +
        (fivePrice ? fivePrice : 0) +
        (sixPrice ? sixPrice : 0) +
        (sevenPrice ? sevenPrice : 0);
    setGrandPrice(totalPrice);

    // Calculate the total CFT, considering undefined variables as 0
    const totalCFT =
        (one ? one : 0) +
        (two ? two : 0) +
        (three ? three : 0) +
        (four ? four : 0) +
        (five ? five : 0) +
        (six ? six : 0) +
        (seven ? seven : 0);
    setGrandCFT(totalCFT);
};

export const onLayout = (event, setTableHeight) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setTableHeight(height);
};

// save view as local media in the device
export const onSaveImageAsync = async (tableHeight, imageRef) => {
    try {
        const localUri = await captureRef(imageRef, {
            height: tableHeight,
            quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        console.log(localUri);
        await saveFile(localUri);
        if (localUri) {
            alert("Saved!");
        }
    } catch (e) {
        console.log(e);
    }
};

// adding to auto print album
async function saveFile(filePath) {
    const albumName = "auto print";
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
        try {
            asset = await MediaLibrary.createAssetAsync(filePath);
        } catch (e) {
            console.error("MediaLibrary.createAssetAsync failed", e);
        }

        if (asset) {
            try {
                let album = await MediaLibrary.getAlbumAsync(albumName);
                if (album) {
                    await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                } else {
                    album = await MediaLibrary.createAlbumAsync(
                        albumName,
                        asset,
                        false
                    );
                }
                const assetResult = await MediaLibrary.getAssetsAsync({
                    first: 1,
                    album,
                    sortBy: MediaLibrary.SortBy.creationTime,
                });
                asset = await assetResult.assets[0];
            } catch (e) {
                console.error(" failed", e);
            }
        } else {
            console.error("unable to use MediaLibrary, can not create assets");
        }
    }
}