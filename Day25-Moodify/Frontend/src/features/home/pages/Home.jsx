import FaceExpression from "../../Expression/components/FaceExpression"
import Player from "../components/Player"

const Home = () => {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "min(640px, calc(100% - 32px))",
        margin: "0 auto",
      }}
    >
      <FaceExpression />
      <Player />
    </main>
  )
}

export default Home
