import { Howl } from "howler";

function getHowlSound(soundName: string, props?: IHowlProperties): Howl {
    let soundSource = `/assets/sounds/${soundName}`;
    let howlProps: IHowlProperties = { src: soundSource, ...props };

    return new Howl(howlProps);
}

export default { getHowlSound };
