import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props) => (
    <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] mt-10" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-white font-bold text-[24px] mt-10" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-white font-bold text-[20px] mt-8" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 text-secondary text-[17px] leading-[30px]" {...props} />
  ),
  a: (props) => (
    <a
      className="text-white hover:text-secondary transition-colors duration-300"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="mt-4 text-secondary text-[17px] leading-[30px] list-disc pl-6" {...props} />
  ),
  ol: (props) => (
    <ol className="mt-4 text-secondary text-[17px] leading-[30px] list-decimal pl-6" {...props} />
  ),
  li: (props) => <li className="mt-2" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 green-pink-gradient p-[1px] rounded-[20px]">
      <div className="bg-tertiary rounded-[20px] py-5 px-5 text-secondary text-[17px] leading-[30px]" {...props} />
    </blockquote>
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto bg-tertiary rounded-2xl p-5">
      <table className="w-full text-secondary text-[14px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="text-white font-bold text-left py-2 px-4 border-b border-secondary" {...props} />
  ),
  td: (props) => (
    <td className="py-2 px-4 border-b border-secondary" {...props} />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className;
    if (!isBlock) {
      return (
        <code className="bg-tertiary text-white text-[14px] rounded-md px-2 py-1" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className={`${className} text-white text-[14px]`} {...props}>
        {children}
      </code>
    );
  },
  pre: (props) => (
    <pre className="mt-6 bg-tertiary rounded-2xl p-5 overflow-x-auto text-white text-[14px]" {...props} />
  ),
  img: (props) => (
    <span className="mt-6 block green-pink-gradient p-[1px] rounded-2xl">
      <img
        loading="lazy"
        className="w-full h-full object-cover rounded-2xl bg-tertiary"
        {...props}
      />
    </span>
  ),
};

const MarkdownRenderer = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MarkdownRenderer;
