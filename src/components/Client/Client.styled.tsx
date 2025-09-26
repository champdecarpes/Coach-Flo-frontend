import type {ReactNode} from "react";


interface InfoBlockProps {
  title: string,
  children: ReactNode,
  classProps: string,
}

export function TrainingBlock() {
  return (
    <InfoBlock title="Training" classProps="grid grid-3 boder-[#E8E8EF]">
      <TrainingInfoElem text="LAST 7 DAYS">
          1/3
      </TrainingInfoElem>
      <TrainingInfoElem text="LAST 30 DAYS">
        4/6
      </TrainingInfoElem>
      <TrainingInfoElem text="NEXT WEEK" zero={true}>
          0
      </TrainingInfoElem>
    </InfoBlock>
  )
}

interface TrainingInfoElemProps {
  children: ReactNode,
  zero?: boolean,
  text: string
}

function TrainingInfoElem({children, zero, text} : TrainingInfoElemProps) {
  return (
    <div className="flex flex-col items-center m-2">
      <div className="text-xs">
        {text}
      </div>
      <div className="mx-auto text-xl font-bold">
        {children}
      </div>
      <div className="text-sm font-light">
        {
          zero ?
            (<div className="text-green-600">
              Tracked
            </div>)
            :
            (<div className="text-red-600">
              Not Tracked
            </div>)
        }
      </div>
    </div>
  )
}

function InfoBlock({title, children, classProps}: InfoBlockProps) {
  return (
    <div className="flex flex-col border-gray-200 rounded-2xl">
      <div className="bg-white р-4 ">
        {title}
      </div>
      <div className={`bg-white ${classProps}`}>
        {children}
      </div>
    </div>
  )
}

