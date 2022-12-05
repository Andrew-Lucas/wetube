import Video from '../models/Video'

export const handleHome = async (req, res) => {
  try {
    const Videos = await Video.find({}).sort({DateCreated: "desc"})
    res.render('home', { pageTitle: 'Home Page', Videos })
  } catch (err) {
    console.log('❌ DB ERROR::', err)
    res.send('<h1>Sorry, an error occured!!!</h1>')
  }
}

export const getEditVideos = async (req, res) => {
  const { id } = req.params
  console.log('The ID: ', id)
  const videoSelected = await Video.findById(id)
  if(!videoSelected){
    return res.render("404", {pageTitle: "Video not found"})
  }
  console.log("Video Object:",videoSelected)
  return res.render('edit', { pageTitle: `Editing ${videoSelected.title}`, videoSelected})
}

export const postEditVideos = async (req, res) => {
  const { id } = req.params
  const { editedTitle, editedDescription, editedHashtag } = req.body
  const videoSelected = await Video.findById(id)
  console.log(videoSelected)
  if(!videoSelected){
    return res.render("404", {pageTitle: "Video not found"})
  }
  videoSelected.title = editedTitle
  videoSelected.description = editedDescription
  videoSelected.hashtags = editedHashtag
  await videoSelected.save()
  return res.redirect(`/videos/${id}`)
}

export const seeVideos = async (req, res) => {
  const { id } = req.params
  console.log('The ID: ', id)
  const videoSelected = await Video.findById(id)
  if(!videoSelected){
    return res.render("404", {pageTitle: "Video not found"})
  }
  return res.render('watch', { pageTitle: `Watching ${videoSelected.title}`, videoSelected })
}

export const getUpload = (req, res) => {
  return res.render('upload', { pageTitle: `Upload Video` })
}

export const postUpload = async (req, res) => {
  // here we are going to add videos on 2023
  const { uploadedTitle, uploadDescription, hashtagsNew } = req.body
  try {
    await Video.create({
      title: uploadedTitle,
      description: uploadDescription,
      hashtags: hashtagsNew
    })
    return res.redirect('/')
  } catch (err) {
      console.log('There was an error')
      return res.render('upload', {pageTitle: `Upload Video` ,ErrorMessage: err._message})
  }
}

export const deleteVideos = async(req, res) =>{
  const {id} = req.params
  console.log(id)
  await Video.findByIdAndDelete(id)
  res.redirect('/') 
}

export const searchVideo = async (req, res) => {
  const {keyword} = req.query
  let searchedVideos = []
  if(keyword){
    searchedVideos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i")
      }
    })
  }
  res.render("SearchVideos", {pageTitle: "Search Videos", searchedVideos, keyword})
}


