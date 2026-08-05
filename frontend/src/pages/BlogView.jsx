import React, { useEffect } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Button } from '../components/ui/button'
// import { Badge } from '../components/ui/badge'
import { Bookmark, Share2 } from 'lucide-react'
import { toast } from 'sonner'

const BlogView = () => {
  const params = useParams()
  const blogId = params.blogId
  
  // Redux Store se blog extract kar rahe hain
  const { blog = [] } = useSelector(store => store.blog || {})
  const selectedBlog = Array.isArray(blog) ? blog.find(b => b._id === blogId) : null

  // ISO Date ko clean formatting me convert karne ke liye helper
  const changeTimeFormat = (isoDate) => {
    if (!isoDate) return "N/A";
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  }

  // Blog Link Share Handler
  const handleShare = (bId) => {
    const blogUrl = `${window.location.origin}/blogs/${bId}`;

    if (navigator.share) {
      navigator
        .share({
          title: selectedBlog?.title || 'Check out this blog!',
          text: 'Read this amazing blog post.',
          url: blogUrl,
        })
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.error('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(blogUrl).then(() => {
        toast.success('Blog link copied to clipboard!');
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  if (!selectedBlog) {
    return (
      <div className="pt-24 text-center text-gray-500 min-h-screen">
        Blog not found!
      </div>
    );
  }

  return (
    <div className='pt-14'>
      <div className='max-w-6xl mx-auto p-6 md:p-10'>
        {/* Breadcrumb Navigation */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to={'/'}>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <Link to={'/blogs'}>
                <BreadcrumbLink>Blogs</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>{selectedBlog?.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Blog Header */}
        <div className="my-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 dark:text-white">
            {selectedBlog?.title}
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={selectedBlog?.author?.photoUrl} alt="Author" />
                <AvatarFallback>
                  {selectedBlog?.author?.firstName?.charAt(0) || "A"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium dark:text-gray-200">
                  {selectedBlog?.author?.firstName} {selectedBlog?.author?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedBlog?.author?.occupation || "Author"}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Published on {changeTimeFormat(selectedBlog?.createdAt)} • 8 min read
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {selectedBlog?.thumbnail && (
          <div className="mb-8 rounded-lg overflow-hidden border dark:border-gray-800">
            <img
              src={selectedBlog?.thumbnail}
              alt={selectedBlog?.title}
              width={1000}
              height={500}
              className="w-full max-h-[500px] object-cover"
            />
            {selectedBlog?.subtitle && (
              <p className="text-sm text-muted-foreground mt-2 italic p-1">
                {selectedBlog?.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Blog Rich HTML Content */}
        <div 
          className='prose dark:prose-invert max-w-none leading-relaxed text-gray-800 dark:text-gray-200' 
          dangerouslySetInnerHTML={{ __html: selectedBlog?.description || "" }} 
        />

        {/* Tags & Actions Footer */}
        <div className='mt-10'>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span variant="secondary">
              {selectedBlog?.category || "General"}
            </span>
          </div>

          {/* Share & Bookmark Options (No Likes & No Comments) */}
          <div className="flex items-center justify-end border-y dark:border-gray-800 border-gray-300 py-4 mb-8">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button onClick={() => handleShare(selectedBlog?._id)} variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogView;