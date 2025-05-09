/*************************************************************************
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
***************************************************************************/

#include <algorithm>
#include <sstream>
#include <ctime>
#include <cassert>
#include "regxstring.h"
#include "regxstring_impl.h"

#if _DZ_DEBUG
#   include <iostream>

static void printRefs(__DZ_OSTRINGSTREAM & oss,const REGXSTRING_NS::__Refs & refs)
{
    for(REGXSTRING_NS::__Refs::const_iterator i = refs.begin();i != refs.end();++i)
        std::cout<<"\t"<<oss.str().substr(i->first,i->second);
}

#   define _OSS_OUT(msg) {  \
        std::cout<<msg<<" : "<<gdata.oss_.str(); \
        printRefs(gdata.oss_,gdata.refs_);    \
        std::cout<<std::endl;}
#else
#   define _OSS_OUT(str)
#endif

NAMESAPCE_BEGIN

// Replacements for new and delete
template<class T>
T * New(){
    T * ret = __DZ_ALLOC<T>().allocate(1);
    return new (ret) T;
}

template<class T,class A>
T * New(const A & a){
    T * ret = __DZ_ALLOC<T>().allocate(1);
    return new (ret) T(a);
}

template<class T,class A,class B>
T * New(const A & a,const B & b){
    T * ret = __DZ_ALLOC<T>().allocate(1);
    return new (ret) T(a,b);
}

template<class T,class A,class B,class C>
T * New(const A & a,const B & b,const C & c){
    T * ret = __DZ_ALLOC<T>().allocate(1);
    return new (ret) T(a,b,c);
}
template<class T>
void Delete(T * p){
    typedef char __dummy[sizeof(T)];
    if(p){
        p->~T();
        __DZ_ALLOC<T>().deallocate(p,1);
    }
}

struct __IsNull
{
    bool operator ()(__NodeBase * n) const{
        return !n;
    }
};

static const char * const SEP = "  ";

static __DZ_STRING sep(int lvl)
{
    __DZ_STRING ret;
    while(lvl-- > 0)
        ret += SEP;
    return ret;
}

static void appendNode(__NodeBase *& parent,__NodeBase * node)
{
    if(!node)
        return;
    if(!parent)
        parent = New<__Seq>(node);
    else
        parent->AppendNode(node);
}

namespace Tools{

    inline bool IsRepeat(int ch){
        return ch == '?' || ch == '+' || ch == '*';
    }

    inline bool IsBegin(int ch){
        return ch == '^';
    }

    inline bool IsEnd(int ch){
        return ch == '$';
    }

    inline bool IsSlash(int ch){
        return ch == '\\';
    }

    inline bool IsSetBegin(int ch){
        return ch == '[';
    }

    inline bool IsSetEnd(int ch){
        return ch == ']';
    }

    inline bool IsGroupBegin(int ch){
        return ch == '(';
    }

    inline bool IsGroupEnd(int ch){
        return ch == ')';
    }

    inline bool IsSelect(int ch){
        return ch == '|';
    }

    inline bool IsRepeatBegin(int ch){
        return ch == '{';
    }

    inline bool IsRepeatEnd(int ch){
        return ch == '}';
    }

    inline bool NeedEnd(int ch){
        return IsGroupEnd(ch) || IsRepeatEnd(ch);
    }

    inline bool IsDigit(int ch){
        return '0' <= ch && ch <= '9';
    }

    inline int TransDigit(int ch){
        return ch - '0';
    }

    inline bool IsDash(int ch){
        return ch == '-';
    }

    inline bool IsAny(int ch){
        return ch == '.';
    }

    inline int IsSubexpMark(int ch){
        return (ch == ':' || ch == '=' || ch == '!' || ch == '>' ? ch : 0);
    }

    inline int IsSubexpMark(const char * s){
        return (*s == '?' ? IsSubexpMark(*(s + 1)) : 0);
    }

    inline char TransSlash(int ch){
        switch(ch){
            case 'f':return '\f';
            case 'n':return '\n';
            case 'r':return '\r';
            case 't':return '\t';
            case 'v':return '\v';
        }
        return ch;
    }
}

//struct __ParseData
int __ParseData::inEnds(int ch) const
{
    int ret = 1;
    for(__Ends::const_reverse_iterator i = ends_.rbegin();i != ends_.rend();++i,++ret){
        if(ch == *i)
            return ret;
        if(Tools::NeedEnd(*i))
            break;
    }
    return 0;
}

//struct __NodeBase
__NodeBase * const __NodeBase::REP_NULL = (__NodeBase *)1;

#if _MEM_LEAK
int __NodeBase::ref = 0;
#endif

__NodeBase::~__NodeBase()
{
#if _MEM_LEAK
    --ref;
#endif
}

int __NodeBase::Repeat(int ch)
{
    return 1;
}

void __NodeBase::AppendNode(__NodeBase * node)
{
    assert(0);
}

//struct __Edge
__Edge::__Edge(int ch)
    : begin_(ch == '^')
{}

__NodeBase * __Edge::Optimize(__ParseData & pdata)
{
    return REP_NULL;
}

void __Edge::RandString(__GenerateData & gdata) const
{
    _OSS_OUT("__Edge");
}

void __Edge::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<(begin_ ? "BEGIN" : "END")<<"\n";
}

//struct __Text
__Text::__Text(int ch)
    : str_(1,ch)
{}

__NodeBase * __Text::Optimize(__ParseData & pdata)
{
    return (str_.empty() ? REP_NULL : 0);
}

void __Text::RandString(__GenerateData & gdata) const
{
    gdata.oss_<<str_;
    _OSS_OUT("__Text");
}

void __Text::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Text("<<str_<<")\n";
}

//class __Charset
__Charset::__Charset()
    : inc_(1)
{}

__Charset::__Charset(const __DZ_STRING & str,bool include)
    : str_(str)
    , inc_(include)
{}

__NodeBase * __Charset::Optimize(__ParseData & pdata)
{
    if(!inc_)
        reverse();
    if(str_.empty())
        return REP_NULL;
    inc_ = str_.size();
    return 0;
}

void __Charset::RandString(__GenerateData & gdata) const
{
    assert(inc_ == str_.size());
    gdata.oss_<<str_[rand() % inc_];
    _OSS_OUT("__Charset");
}

void __Charset::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Charset(INCLUDE"
        <<", "<<str_<<")\n";
}

void __Charset::Exclude()
{
    inc_ = 0;
}

void __Charset::AddChar(int ch)
{
    str_.push_back(ch);
}

void __Charset::AddRange(int from,int to)
{
    for(;from <= to;++from)
        str_.push_back(from);
}

void __Charset::AddRange(__Charset * node)
{
    if(!node)
        return;
    unite(*node);
}

void __Charset::Unique()
{
    inc_ ? unique() : reverse();
}

void __Charset::unite(__Charset & node)
{
    if(!node.inc_)
        node.reverse();
    str_ += node.str_;
}

void __Charset::reverse()
{
    const int _CHAR_MIN = 32;
    const int _CHAR_MAX = 126;
    unique();
    __DZ_STRING s;
    s.swap(str_);
    int c = _CHAR_MIN;
    size_t i = 0,e = s.size();
    for(;c <= _CHAR_MAX && i < e;++i){
        int ch = s[i];
        if(c < ch)
            AddRange(c,ch - 1);
        c = std::max(ch + 1,_CHAR_MIN);
    }
    if(c <= _CHAR_MAX)
        AddRange(c,_CHAR_MAX);
    inc_ = !inc_;
}

void __Charset::unique()
{
    if(!str_.empty()){
        std::sort(str_.begin(),str_.end());
        str_.erase(std::unique(str_.begin(),str_.end()),str_.end());
    }
}

//class __Repeat
__Repeat::__Repeat(__NodeBase * node,int ch)
    : node_(node)
    , min_(0)
    , max_(0)
{
    switch(ch){
        case '?':min_ = 0;max_ = 1;break;
        case '+':min_ = 1;max_ = INFINITE;break;
        case '*':min_ = 0;max_ = INFINITE;break;
        default:;
    }
}

__Repeat::__Repeat(__NodeBase * node,int min,int max)
    : node_(node)
    , min_(min)
    , max_(max)
{}

__Repeat::~__Repeat(){
    Delete(node_);
}

__NodeBase * __Repeat::Optimize(__ParseData & pdata)
{
    min_ &= _CLEAR_FLAGS;
    max_ &= _CLEAR_FLAGS;
    if(isInfinite()){
        max_ = min_ + pdata.config_.repeatInfinite;
        if( max_ > _REPEAT_MAX)
            max_ = _REPEAT_MAX;
    }
    if(!node_ || (min_ > max_) || (!min_ && !max_))
        return REP_NULL;
    __NodeBase * r = node_->Optimize(pdata);
    if(r == REP_NULL)
        return REP_NULL;
    else if(r){
        Delete(node_);
        node_ = r;
    }
    if(1 == max_ && 1 == min_){
        r = node_;
        node_ = 0;
        return r;
    }
    max_ -= min_ - 1;
    return 0;
}

void __Repeat::RandString(__GenerateData & gdata) const
{
    for(int t = min_ + rand() % max_;t > 0;t--)
        node_->RandString(gdata);
    _OSS_OUT("__Repeat");
}

void __Repeat::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Repeat["<<min_<<", "<<(min_ + max_ - 1)<<"]\n";
    ++lvl;
    if(node_)
        node_->Debug(out,lvl);
    else
        out<<sep(lvl)<<"NULL\n";
}

int __Repeat::Repeat(int ch)
{
    if(canRepeat()){
        switch(ch){
            case '?':min_ |= _NON_GREEDY;return 2;break;
            case '+':min_ |= _PROSSESSIVE;return 2;break;
            default:;
        }
    }
    return 0;
}

//class __Seq
__Seq::__Seq(__NodeBase * node)
    : seq_(1,node)
{}

__Seq::~__Seq(){
    for(__Con::const_iterator i = seq_.begin(),e = seq_.end();i != e;++i)
        Delete(*i);
}

__NodeBase * __Seq::Optimize(__ParseData & pdata)
{
    if(seq_.empty())
        return REP_NULL;
    for(__Con::iterator i = seq_.begin(),e = seq_.end();i != e;++i)
        if(*i){
            __NodeBase * r = (*i)->Optimize(pdata);
            if(r){
                Delete(*i);
                *i = (r == REP_NULL ? 0 : r);
            }
        }
    seq_.erase(std::remove_if(seq_.begin(),seq_.end(),__IsNull()),seq_.end());
    if(seq_.empty())
        return REP_NULL;
    if(seq_.size() == 1){
        __NodeBase * r = seq_[0];
        seq_.clear();
        return r;
    }
    return 0;
}

void __Seq::RandString(__GenerateData & gdata) const
{
    for(__Con::const_iterator i = seq_.begin(),e = seq_.end();i != e;++i)
        (*i)->RandString(gdata);
    _OSS_OUT("__Seq");
}

void __Seq::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Seq("<<seq_.size()<<")\n";
    ++lvl;
    for(__Con::const_iterator i = seq_.begin(),e = seq_.end();i != e;++i){
        if(*i)
            (*i)->Debug(out,lvl);
        else
            out<<sep(lvl)<<"NULL\n";
    }
}

void __Seq::AppendNode(__NodeBase * node)
{
    if(!seq_.empty())
        if(__Text * cur = dynamic_cast<__Text *>(node))
            if(__Text * prev = dynamic_cast<__Text *>(seq_.back())){
                *prev += *cur;
                Delete(node);
                return;
            }
    seq_.push_back(node);
}

//class __Group
__Group::__Group(__NodeBase * node,int mark)
    : node_(node)
    , mark_(mark)
{
    if(!Tools::IsSubexpMark(mark_))
        mark_ |= INDEX;
}

__Group::~__Group()
{
    Delete(node_);
}

__NodeBase * __Group::Optimize(__ParseData & pdata)
{
    if(!node_ || mark_ == '!')
        return REP_NULL;
    __NodeBase * r = node_->Optimize(pdata);
    if(r == REP_NULL)
        return REP_NULL;
    else if(r){
        Delete(node_);
        node_ = r;
    }
    switch(mark_){
        case ':':
        case '=':
        case '>':{
            r = node_;
            node_ = 0;
            return r;}
        default:;
    }
    mark_ = (mark_ & (INDEX - 1)) - 1;
    return 0;
}

void __Group::RandString(__GenerateData & gdata) const
{
    assert(node_);
    assert(0 <= mark_ && mark_ < MAX_GROUPS);
    if(mark_ >= gdata.refs_.size())
        gdata.refs_.resize(mark_ + 1);
    gdata.refs_.back() = __RefValue(gdata.oss_.str().size(),__DZ_STRING::npos);
    node_->RandString(gdata);
    assert(mark_ < gdata.refs_.size());
    gdata.refs_[mark_].second = gdata.oss_.str().size() - gdata.refs_[mark_].first;
    _OSS_OUT("__Group");
}

void __Group::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Group(";
    switch(mark_){
        case ':':out<<"?:";break;
        case '=':out<<"?=";break;
        case '!':out<<"?!";break;
        case '>':out<<"?>";break;
        default:out<<(mark_ & (INDEX - 1));
    }
    out<<")\n";
    ++lvl;
    if(node_)
        node_->Debug(out,lvl);
    else
        out<<sep(lvl)<<"NULL\n";
}

//class __Select
__Select::__Select(__NodeBase * node)
    : sel_(1,node)
    , sz_(0)
{}

__Select::~__Select()
{
    for(__Con::const_iterator i = sel_.begin(),e = sel_.end();i != e;++i)
        Delete(*i);
}

__NodeBase * __Select::Optimize(__ParseData & pdata)
{
    if(sel_.empty())
        return REP_NULL;
    for(__Con::iterator i = sel_.begin(),e = sel_.end();i != e;++i)
        if(*i){
            __NodeBase * r = (*i)->Optimize(pdata);
            if(r){
                Delete(*i);
                *i = (r == REP_NULL ? 0 : r);
            }
        }
    sel_.erase(std::remove_if(sel_.begin(),sel_.end(),__IsNull()),sel_.end());
    if(sel_.empty())
        return REP_NULL;
    if(sel_.size() == 1){
        __NodeBase * r = sel_[0];
        sel_.clear();
        return r;
    }
    sz_ = sel_.size();
    return 0;
}

void __Select::RandString(__GenerateData & gdata) const
{
    if(sz_)
        sel_[rand() % sz_]->RandString(gdata);
    _OSS_OUT("__Select");
}

void __Select::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Select("<<sel_.size()<<")\n";
    ++lvl;
    for(__Con::const_iterator i = sel_.begin(),e = sel_.end();i != e;++i)
        if(*i)
            (*i)->Debug(out,lvl);
        else
            out<<sep(lvl)<<"NULL\n";
}

void __Select::AppendNode(__NodeBase * node)
{
    sel_.push_back(node);
}

//class __Ref
__Ref::__Ref(int index)
    : index_(index)
{}

__NodeBase * __Ref::Optimize(__ParseData & pdata)
{
    --index_;
    return 0;
}

void __Ref::RandString(__GenerateData & gdata) const
{
    assert(index_ < gdata.refs_.size());
    const __RefValue & ref = gdata.refs_[index_];
    __DZ_STRING str = gdata.oss_.str();
    if(ref.first < str.size())
        gdata.oss_<<str.substr(ref.first,ref.second);
    _OSS_OUT("__Ref("<<index_<<")");
}

void __Ref::Debug(std::ostream & out,int lvl) const
{
    out<<sep(lvl)<<"Ref("<<index_<<")\n";
}

//class __CRegxString
__CRegxString::__CRegxString()
    : top_(0)
{}

void __CRegxString::ParseRegx(const __DZ_STRING & regx,const Config * config)
{
    uninit();
    regx_ = regx;
    if(regx_.empty())
        return;
    Config def;
    __ParseData pdata(config ? *config : def);
    top_ = processSeq(pdata).first;
    if(!top_)
        return;
    __NodeBase * r = top_->Optimize(pdata);
    if(r){
        Delete(top_);
        top_ = (r == __NodeBase::REP_NULL ? 0 : r);
    }
    // if(top_)
    //     srand((unsigned int)time(0));
    // Changed by Adrian Lita
}

const __DZ_STRING & __CRegxString::RandString()
{
    str_.clear();
    if(top_){
        __DZ_OSTRINGSTREAM oss;
        __GenerateData gdata(oss);
        top_->RandString(gdata);
        str_ = oss.str();
    }
    return str_;
}

void __CRegxString::Debug(std::ostream & out) const{
    out<<"regx_ : "<<regx_<<"\nstructure :\n";
    if(top_)
        top_->Debug(out,0);
    else
        out<<"NULL\n";
}

void __CRegxString::uninit()
{
    if(top_){
        Delete(top_);
        top_ = 0;
    }
    str_.clear();
}

__CRegxString::__Ret __CRegxString::processSeq(__ParseData & pdata)
{
    __Ret ret;
    __NodeBase * cur = 0;
    bool begin = true;
    for(const size_t e = regx_.length();pdata.i_ < e;++pdata.i_){
        int ch = regx_[pdata.i_];
        if(begin){
            if(Tools::IsBegin(ch)){
                cur = New<__Edge>(ch);
                continue;
            }
            begin = false;
        }
        if(Tools::IsRepeat(ch) && cur){
            int r = cur->Repeat(ch);
            if(r){
                if(r == 1)
                    cur = New<__Repeat>(cur,ch);
                continue;
            }
        }
        if(Tools::IsRepeatBegin(ch)){
            cur = processRepeat(cur,pdata);
            continue;
        }
        appendNode(ret.first,cur);
        ret.second = pdata.inEnds(ch);
        if(ret.second)
            return ret;
        if(Tools::IsSelect(ch))
            return processSelect(ret.first,pdata);
        if(Tools::IsEnd(ch))
            cur = New<__Edge>(ch);
        else if(Tools::IsAny(ch)){
             __Charset * set = New<__Charset>("\n",false);
             set->Unique();
             cur = set;
        }else if(Tools::IsSetBegin(ch))
            cur = processSet(pdata);
        else if(Tools::IsGroupBegin(ch))
            cur = processGroup(pdata);
        else if(Tools::IsSlash(ch))
            cur = processSlash(true,pdata).first;
        else
            cur = New<__Text>(ch);
    }
    appendNode(ret.first,cur);
    return ret;
}

__CRegxString::__Ret __CRegxString::processSlash(bool bNode,__ParseData & pdata)
{
    ++pdata.i_;
    __Ret ret((__NodeBase *)0,pdata.i_ < regx_.length() ? Tools::TransSlash(regx_[pdata.i_]) : '\\');
    __Charset * set = 0;
    switch(ret.second){
        case 'd':set = New<__Charset>("0123456789",true);break;
        case 'D':set = New<__Charset>("0123456789",false);break;
        case 's':set = New<__Charset>(/*"\f\n\r\v"*/"\t ",true);break;
        case 'S':set = New<__Charset>(/*"\f\n\r\v"*/"\t ",false);break;
        case 'w':{   //A-Za-z0-9_
            set = New<__Charset>();
            set->AddRange('A','Z');
            set->AddRange('a','z');
            set->AddRange('0','9');
            set->AddChar('_');
            break;}
        case 'W':{   //^A-Za-z0-9_
            set =  New<__Charset>();
            set->AddRange('A','Z');
            set->AddRange('a','z');
            set->AddRange('0','9');
            set->AddChar('_');
            set->Exclude();
            break;}
        default:;
    }
    if(set){
        set->Unique();
        ret.first = set;
    }else if(bNode){
        if(Tools::IsDigit(ret.second)){
            int i = ret.second - '0';
            if(!i)
                ret.second = 0;
            else if(i <= pdata.ref_)
                ret.first = New<__Ref>(i);
        }
        if(!ret.first)
            ret.first = New<__Text>(ret.second);
    }
    return ret;
}

__NodeBase * __CRegxString::processSet(__ParseData & pdata)
{
    size_t bak = pdata.i_++;
    __Charset * ret = New<__Charset>();
    bool begin = true;
    int prev = 0;
    for(const size_t e = regx_.length();pdata.i_ < e;++pdata.i_){
        int ch = regx_[pdata.i_];
        if(begin && Tools::IsBegin(ch)){
            ret->Exclude();
            begin = false;
            continue;
        }
        if(Tools::IsDash(ch) && prev){
            int to = 0;
            if(processRange(to,pdata)){
                ret->AddRange(prev,to);
                prev = 0;
                continue;
            }
        }
        if(prev)
            ret->AddChar(prev);
        if(Tools::IsSetEnd(ch)){
            ret->Unique();
            return ret;
        }
        if(Tools::IsSlash(ch)){
            __Ret s = processSlash(false,pdata);
            if(s.first){    //charset
                ret->AddRange(dynamic_cast<__Charset *>(s.first));
                Delete(s.first);
                prev = 0;
                continue;
            }
            ch = s.second;
        }
        prev = ch;
    }
    Delete(ret);
    pdata.i_ = bak;
    return New<__Text>('[');
}

__NodeBase * __CRegxString::processGroup(__ParseData & pdata)
{
    int bak = pdata.i_++;
    int mark = ignoreSubexpMarks(pdata);
    pdata.ends_.push_back(')');
    if(!mark)
        mark = ++pdata.ref_;
    __Ret ret = processSeq(pdata);
    pdata.ends_.pop_back();
    if(ret.second)
        return New<__Group>(ret.first,mark);
    Delete(ret.first);
    pdata.i_ = bak;
    return New<__Text>('(');
}

__CRegxString::__Ret __CRegxString::processSelect(__NodeBase * node,__ParseData & pdata)
{
    __Ret ret(New<__Select>(node),0);
    pdata.ends_.push_back('|');
    for(const size_t e = regx_.length();pdata.i_ < e;){
        ++pdata.i_;
        __Ret r = processSeq(pdata);
        ret.first->AppendNode(r.first);
        if(r.second > 1){
            ret.second = r.second - 1;
            break;
        }
    }
    pdata.ends_.pop_back();
    return ret;
}

__NodeBase * __CRegxString::processRepeat(__NodeBase * node,__ParseData & pdata)
{
    if(node && node->Repeat(0)){
        size_t bak = pdata.i_++;
        int min = 0,max = __Repeat::INFINITE;
        switch(processInt(min,pdata)){
            case ',':
                ++pdata.i_;
                if(processInt(max,pdata) == '}')
                    return New<__Repeat>(node,min,(min < max ? max : min));
                break;
            case '}':
                return New<__Repeat>(node,min,min);
            default:;
        }
        pdata.i_ = bak;
    }
    return New<__Text>('{');
}

int __CRegxString::processInt(int & result,__ParseData & pdata)
{
    bool begin = true;
    for(const size_t e = regx_.length();pdata.i_ < e;++pdata.i_){
        int ch = regx_[pdata.i_];
        if(Tools::IsDigit(ch)){
            ch = Tools::TransDigit(ch);
            if(begin){
                result = ch;
                begin = false;
            }else{
                result *= 10;
                if(result < 0)
                    return 0;
                result += ch;
            }
        }else
            return ch;
    }
    return 0;
}

bool __CRegxString::processRange(int & result,__ParseData & pdata)
{
    if(++pdata.i_ < regx_.size() && regx_[pdata.i_] != ']'){
        result = regx_[pdata.i_];
        return true;
    }
    --pdata.i_;
    return false;
}

int __CRegxString::ignoreSubexpMarks(__ParseData & pdata)
{
    int ret = 0;
    if(pdata.i_ + 1 < regx_.size()){
        ret = Tools::IsSubexpMark(&regx_[pdata.i_]);
        if(ret)
            pdata.i_ += 2;
    }
    return ret;
}

NAMESAPCE_END
