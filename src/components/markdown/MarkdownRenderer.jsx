import { MDXProvider } from "@mdx-js/react";

const components = {
  h1: (props) => (
    <h1 className="text-white font-black md:text-[48px] sm:text-[40px] xs:text-[34px] text-[28px] mt-16 leading-[1.1]" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-white font-bold text-[24px] sm:text-[28px] mt-14 leading-[1.2]" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-white font-bold text-[18px] sm:text-[20px] mt-10 leading-[1.3]" {...props} />
  ),
  p: (props) => (
    <p className="mt-5 text-secondary text-[16px] sm:text-[17px] leading-[1.8]" {...props} />
  ),
  a: (props) => (
    <a
      className="text-[#00cea8] hover:text-white font-medium transition-colors duration-300 underline decoration-[#00cea8]/30 underline-offset-4 hover:decoration-white/50"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="markdown-list markdown-list--unordered mt-5 text-secondary text-[16px] sm:text-[17px] leading-[1.8] list-none pl-0 space-y-3" {...props} />
  ),
  ol: (props) => (
    <ol className="markdown-list markdown-list--ordered mt-5 text-secondary text-[16px] sm:text-[17px] leading-[1.8] list-none pl-0 space-y-3" {...props} />
  ),
  li: (props) => (
    <li className="markdown-list-item" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="mt-8 relative">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-[#00cea8] to-[#bf61ff]" />
      <div className="bg-tertiary/50 rounded-r-2xl py-5 px-6 ml-4 text-secondary text-[16px] sm:text-[17px] leading-[1.8] italic" {...props} />
    </blockquote>
  ),
  table: (props) => (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-white/5">
      <table className="w-full text-secondary text-[14px]" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="text-white font-semibold text-left py-3 px-5 bg-tertiary/80 border-b border-white/5" {...props} />
  ),
  td: (props) => (
    <td className="py-3 px-5 border-b border-white/5" {...props} />
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className;
    if (!isBlock) {
      return (
        <code className="bg-tertiary/80 text-[#00cea8] text-[13px] sm:text-[14px] rounded-lg px-2 py-0.5 font-mono border border-white/5" {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className={`${className} text-white text-[13px] sm:text-[14px] font-mono`} {...props}>
        {children}
      </code>
    );
  },
  pre: (props) => (
    <pre className="mt-8 bg-tertiary/80 rounded-2xl p-5 sm:p-6 overflow-x-auto text-white text-[13px] sm:text-[14px] border border-white/5 shadow-lg" {...props} />
  ),
  img: (props) => (
    <span className="mt-8 block relative rounded-2xl overflow-hidden border border-white/5">
      <img
        loading="lazy"
        className="w-full h-full object-cover bg-tertiary"
        {...props}
      />
    </span>
  ),
  strong: (props) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  hr: () => (
    <hr className="my-12 border-0 h-[1px] bg-gradient-to-r from-transparent via-[#aaa6c3]/20 to-transparent" />
  ),
};

const MarkdownRenderer = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default MarkdownRenderer;
