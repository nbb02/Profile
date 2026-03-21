import LiquidEther from "../components/liquid-ether"
import Grid from "../components/grid"

export default function Desktop() {
  return (
    <div className="h-full">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          backgroundColor: "black",
          zIndex: -1,
        }}
      >
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          //   color0="#5227FF"
          //   color1="#FF9FFC"
          //   color2="#B19EEF"
        />
      </div>

      <div className="text-white h-full h-[94vh]">
        <Grid />
      </div>
    </div>
  )
}
