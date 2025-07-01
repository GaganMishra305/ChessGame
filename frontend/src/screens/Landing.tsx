import { useNavigate } from "react-router"
import { Button } from "../components/Button";

export const Landing = () => {
    const router = useNavigate();
    return <>
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src={"/chessboard.png"} className="max-w-96"></img>
                    </div>
                    <div className="pt-8">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold text-white">
                                Play Chess Online on #3 site!
                            </h1>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button onClick={
                                () => {router('/game')}
                            }>
                                Play Online!    
                            </Button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
}