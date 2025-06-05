using System.Collections.ObjectModel;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace TodoListApp;

public partial class MainPage : ContentPage
{
    public ObservableCollection<TodoItem> Tasks { get; set; } = new();
    public bool HasTasks => Tasks.Count > 0;
    public bool NoTasks => Tasks.Count == 0;

    private readonly HttpClient _httpClient;
    private readonly string _apiBaseUrl;

    public MainPage()
    {
        InitializeComponent();
        BindingContext = this;
        _apiBaseUrl = GetApiBaseUrl();
        _httpClient = new HttpClient();
        // Load tasks after page is fully loaded to ensure UI is ready
        this.Loaded += (s, e) => LoadTasks();
    }

    private string GetApiBaseUrl()
    {
#if ANDROID
        // Use 10.0.2.2 for Android emulator, but ensure no trailing slash for DELETE
        return "http://10.0.2.2:8001/todos";
#elif IOS
        return "http://localhost:8001/todos";
#else
        return "http://localhost:8001/todos";
#endif
    }

    private void UpdateTaskVisibility()
    {
        OnPropertyChanged(nameof(HasTasks));
        OnPropertyChanged(nameof(NoTasks));
        TasksCollection.IsVisible = Tasks.Count > 0;
        NoTasksLabel.IsVisible = Tasks.Count == 0;
    }

    private async void LoadTasks()
    {
        try
        {
            var response = await _httpClient.GetAsync(_apiBaseUrl + "/");
#if ANDROID
            Android.Util.Log.Info("MAUI", $"[LoadTasks] GET {_apiBaseUrl}/ status: {response.StatusCode}");
#else
            Console.WriteLine($"[LoadTasks] GET {_apiBaseUrl}/ status: {response.StatusCode}");
#endif
            if (response.IsSuccessStatusCode)
            {
                var items = await response.Content.ReadFromJsonAsync<List<TodoItem>>();
#if ANDROID
                Android.Util.Log.Info("MAUI", $"[LoadTasks] Items count: {items?.Count ?? 0}");
#else
                Console.WriteLine($"[LoadTasks] Items count: {items?.Count ?? 0}");
#endif
                MainThread.BeginInvokeOnMainThread(() => {
                    Tasks.Clear();
                    if (items != null)
                        foreach (var item in items)
                            Tasks.Add(item);
                    UpdateTaskVisibility();
                });
            }
            else
            {
                var error = await response.Content.ReadAsStringAsync();
#if ANDROID
                Android.Util.Log.Info("MAUI", $"[LoadTasks] Error: {error}");
#else
                Console.WriteLine($"[LoadTasks] Error: {error}");
#endif
            }
        }
        catch (Exception ex)
        {
#if ANDROID
            Android.Util.Log.Info("MAUI", $"[LoadTasks] Exception: {ex.Message}");
#else
            Console.WriteLine($"[LoadTasks] Exception: {ex.Message}");
#endif
        }
    }

    private async void OnAddClicked(object sender, EventArgs e)
    {
        var text = TaskEntry.Text?.Trim();
        if (string.IsNullOrEmpty(text))
            return;
        var newItem = new { text };
        try
        {
            // POST must go to /todos/ (with trailing slash)
            var response = await _httpClient.PostAsJsonAsync(_apiBaseUrl + "/", newItem);
            if (response.IsSuccessStatusCode)
            {
                TaskEntry.Text = string.Empty;
                await Task.Delay(200);
                LoadTasks();
            }
        }
        catch { }
    }

    private async void OnRemoveClicked(object sender, EventArgs e)
    {
        if (sender is Button btn && btn.CommandParameter is not null)
        {
            var id = btn.CommandParameter.ToString();
            try
            {
                // Ensure single slash between base and id
                var url = $"{_apiBaseUrl}/{id}";
                var response = await _httpClient.DeleteAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    await Task.Delay(200);
                    LoadTasks();
                }
            }
            catch { }
        }
    }
}

public class TodoItem
{
    [JsonPropertyName("id")]
    public int? Id { get; set; }
    [JsonPropertyName("text")]
    public string? Text { get; set; }
}
