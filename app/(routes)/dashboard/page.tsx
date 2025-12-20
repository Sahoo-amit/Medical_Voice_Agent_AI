import History from './_components/History'
import DialogBox from './_components/DialogBox'

const DashBoard = () => {
  return (
    <div className='mt-5'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>My Dashboard</h2>
        <div className='hidden sm:block md:block lg:block'>
          <DialogBox />
        </div>
      </div>
      <History />
    </div>
  )
}

export default DashBoard