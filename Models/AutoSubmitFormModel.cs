namespace CTFomni.Models;

public class AutoSubmitFormModel
{
    public string ActionUrl { get; set; }
    public Dictionary<string, string> FormData { get; set; }
}