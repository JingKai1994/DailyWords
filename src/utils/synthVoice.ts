import { ElMessageBox } from 'element-plus';
/**
 * @description: 使用speech API達成聲音播放功能
 */
export const synthVoice = async (text: string) => {
    const synth = window.speechSynthesis;
    //若不支援需要跳出提示窗
    if (!synth) {
        try {
            await ElMessageBox.alert('Your browser does not support Speech Synthesis.', 'Warning',{
                confirmButtonText: 'OK',
                type: 'warning',
                center: true,
            });
        } catch (error) {
            console.error('Error showing message box:', error);
        }
        return;
    }
    //若有正在說話的語音，不繼續增加語音隊列
    if(synth.speaking){
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
};
