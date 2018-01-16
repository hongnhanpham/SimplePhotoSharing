using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace MyPhotoGallery.Models
{
    public static class Util
    {
        public static string MakeFriendlyFileName(this string name)
        {
            if (string.IsNullOrEmpty(name))
                return string.Empty;
            name = RemoveVietnameseCharacters(name);
            name = Removeinvalidstring(name);
            string invalidChars = Regex.Escape("^ +.$%'`{}~*!#()&_^:’?,\"");
            string invalidReStr = string.Format(@"[{0}]", invalidChars);
            var nName = Regex.Replace(name.ToLower(), invalidReStr, "-");

            while (nName.Contains("--"))
            {
                nName = nName.Replace("--", "-");
            }

            if (nName.Last() == '-')
            {
                nName = nName.Remove(nName.Length - 1);
            }

            if (nName.First() == '-')
            {
                nName = nName.Remove(0, 1);
            }

            return nName;
        }

        public static string Removeinvalidstring(string s)
        {
            s = Regex.Replace(s, @"[^\u0000-\u007F]+", string.Empty);
            return s;
        }

        public static string RemoveVietnameseCharacters(string strString)
        {
            char[] accents_arrs = new char[]{'à','á','ạ','ả','ã','â','ầ','ấ','ậ','ẩ','ẫ','ă',
            'ằ','ắ','ặ','ẳ','ẵ','è','é','ẹ','ẻ','ẽ','ê','ề',
            'ế','ệ','ể','ễ',
            'ì','í','ị','ỉ','ĩ',
            'ò','ó','ọ','ỏ','õ','ô','ồ','ố','ộ','ổ','ỗ','ơ',
            'ờ','ớ','ợ','ở','ỡ',
            'ù','ú','ụ','ủ','ũ','ư','ừ','ứ','ự','ử','ữ',
            'ỳ','ý','ỵ','ỷ','ỹ',
            'đ',
            'À','Á','Ạ','Ả','Ã','Â','Ầ','Ấ','Ậ','Ẩ','Ẫ','Ă',
            'Ằ','Ắ','Ặ','Ẳ','Ẵ',
            'È','É','Ẹ','Ẻ','Ẽ','Ê','Ề','Ế','Ệ','Ể','Ễ',
            'Ì','Í','Ị','Ỉ','Ĩ',
            'Ò','Ó','Ọ','Ỏ','Õ','Ô','Ồ','Ố','Ộ','Ổ','Ỗ','Ơ',
            'Ờ','Ớ','Ợ','Ở','Ỡ',
            'Ù','Ú','Ụ','Ủ','Ũ','Ư','Ừ','Ứ','Ự','Ử','Ữ',
            'Ỳ','Ý','Ỵ','Ỷ','Ỹ',
            'Đ'};
            char[] no_accents_arr = new char[]{'a','a','a','a','a','a','a','a','a','a','a',
            'a','a','a','a','a','a',
            'e','e','e','e','e','e','e','e','e','e','e',
            'i','i','i','i','i',
            'o','o','o','o','o','o','o','o','o','o','o','o',
            'o','o','o','o','o',
            'u','u','u','u','u','u','u','u','u','u','u',
            'y','y','y','y','y',
            'd',
            'A','A','A','A','A','A','A','A','A','A','A','A',
            'A','A','A','A','A',
            'E','E','E','E','E','E','E','E','E','E','E',
            'I','I','I','I','I',
            'O','O','O','O','O','O','O','O','O','O','O','O',
            'O','O','O','O','O',
            'U','U','U','U','U','U','U','U','U','U','U',
            'Y','Y','Y','Y','Y',
            'D'};

            int i = 0;
            foreach (char chr in accents_arrs)
            {
                strString = strString.Replace(chr, no_accents_arr[i]);
                i++;
            }

            return strString;
        }

    }
}